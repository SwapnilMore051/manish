import { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import VideoModal from '../upload-file-components/add-video-modal/video-modal';
import './crud-video.scss';
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';
import API from '../../../api/endpoints';
import "../../../../src/components/common-api-table.scss";
import Loader from '../../../components/loader/loader';

type VideoFormData = {
    _id?: string;
    title: string;
    url: string;
    description: string;
};

const CrudVideo = () => {
    const [videos, setVideos] = useState<VideoFormData[]>([]);
    const [videoModal, setVideoModal] = useState(false);
    const [editVideo, setEditVideo] = useState<VideoFormData | null>(null);
    const [deleteVideoModal, setDeleteVideoModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };

    // Detect if URL is YouTube/Vimeo embed or a direct video file
    const renderVideo = (video: VideoFormData) => {
        const url = video.url;

        // YouTube or Vimeo embed
        if (url.includes("youtube.com") || url.includes("vimeo.com")) {
            return (
                <iframe
                    className="crud-video-sample"
                    src={url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        }

        // Otherwise assume direct file (e.g. .mp4)
        return (
            <video className="crud-video-sample" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    };

    // Fetch all videos
    const fetchVideos = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API.VIDEOS.GET_ALL);
            const result = await res.json();
            if (result.status === 'success') {
                setVideos(result.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // Add / Update
    const handleVideoFormSubmit = async (data: VideoFormData) => {
        try {
            const method = data._id ? 'PUT' : 'POST';
            const url = data._id ? API.VIDEOS.UPDATE(data._id) : API.VIDEOS.CREATE;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast({
                    type: 'success',
                    message: data._id ? 'Video updated!' : 'Video added!',
                });
                setVideoModal(false);
                setEditVideo(null);
                fetchVideos(); // refresh table
            } else {
                showToast({ type: 'error', message: 'Failed to save video.' });
            }
        } catch (err) {
            console.error(err);
            showToast({ type: 'error', message: 'Error saving video.' });
        }
    };

    // 🔹 Open Add Modal
    const openAddVideoModal = () => {
        setEditVideo(null);
        setVideoModal(true);
    };

    // 🔹 Open Edit Modal
    const openEditVideoModal = (video: VideoFormData) => {
        setEditVideo(video);
        setVideoModal(true);
    };

    // 🔹 Delete
    const handleDelete = async () => {
        if (!editVideo?._id) return;
        try {
            await fetch(API.VIDEOS.DELETE(editVideo._id), { method: 'DELETE' });
            setDeleteVideoModal(false);
            showToast({ type: 'success', message: 'Video deleted!' });
            setVideos(videos.filter((v) => v._id !== editVideo._id));
        } catch (err) {
            console.error(err);
        }
    };

    const closeVideoModal = () => {
        setVideoModal(false);
        setEditVideo(null);
    };

    return (
        <div className="crud-video-wrapper">
            <Toast ref={toastRef} />
            <CrudHeader title="Upload or update video" fileType="Add Video" onClick={openAddVideoModal} />

            {/* Table */}
            <div className="table">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Title</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Video</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className='table-body' ref={loaderRef}>
                    {isLoading ? (
                        <div className="table-loader-container">
                            <Loader smallWidthLoader={false} />
                        </div>
                    ) : (
                        videos.map((video) => (
                            <div className="table-row" key={video._id}>
                                <div className="table-cell">{video.title}</div>
                                <div className="table-cell">{video.description}</div>
                                <div className="table-cell">{renderVideo(video)}</div>
                                <div className="table-cell action-buttons">
                                    <img
                                        className="crud-action-icons"
                                        src="/assets/icons/ic_edit_pen_grey.svg"
                                        alt="Edit"
                                        onClick={() => openEditVideoModal(video)}
                                    />
                                    <img
                                        className="crud-action-icons"
                                        src="/assets/icons/trash.svg"
                                        alt="Delete"
                                        onClick={() => {
                                            setEditVideo(video);
                                            setDeleteVideoModal(true);
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {videoModal && (
                <Modal isCloseAvailable isOverlayClickable isOverlayVisible onClose={closeVideoModal}>
                    <VideoModal
                        heading={editVideo ? 'Edit Video' : 'Add Video'}
                        onClose={closeVideoModal}
                        onSubmit={handleVideoFormSubmit}
                        initialData={editVideo ?? undefined}
                    />
                </Modal>
            )}

            {/* Delete Modal */}
            {deleteVideoModal && (
                <ConfirmationModal
                    closeModalCb={() => setDeleteVideoModal(false)}
                    modalData={{
                        title: 'Delete Video',
                        description: 'Are you sure you want to delete this video?',
                    }}
                    footerButtons={[
                        {
                            name: 'Cancel',
                            type: 'secondary-button',
                            clickAction: () => setDeleteVideoModal(false),
                        },
                        { name: 'Delete', type: 'primary-button', clickAction: handleDelete },
                    ]}
                />
            )}
        </div>
    );
};

export default CrudVideo;
