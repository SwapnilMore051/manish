import { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import AudioModal from '../upload-file-components/add-audio-modal/audio-modal';
import './crud-audio.scss';
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';
import API from '../../../api/endpoints';

type AudioFormData = {
    _id?: string;
    image: string;
    audio: string;
    description: string;
};

const CrudAudio = () => {
    const [audios, setAudios] = useState<AudioFormData[]>([]);
    const [audioModal, setAudioModal] = useState(false);
    const [editAudio, setEditAudio] = useState<AudioFormData | null>(null);
    const [deleteAudioModal, setDeleteAudioModal] = useState(false);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };

    // 🔹 Fetch all audios
    const fetchAudios = async () => {
        try {
            const res = await fetch(API.AUDIOS.GET_ALL);
            const result = await res.json();
            if (result.status === 'success') {
                setAudios(result.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAudios();
    }, []);

    // 🔹 Add / Update
    const handleAudioFormSubmit = async (data: AudioFormData) => {
        try {
            const method = data._id ? 'PUT' : 'POST';
            const url = data._id
                ? API.AUDIOS.UPDATE(data._id)
                : API.AUDIOS.CREATE;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast({
                    type: 'success',
                    message: data._id ? 'Audio updated!' : 'Audio added!',
                });
                setAudioModal(false);
                setEditAudio(null);
                fetchAudios(); // refresh table
            } else {
                showToast({ type: 'error', message: 'Failed to save audio.' });
            }
        } catch (err) {
            console.error(err);
            showToast({ type: 'error', message: 'Error saving audio.' });
        }
    };

    // 🔹 Open Add Modal
    const openAddAudioModal = () => {
        setEditAudio(null);
        setAudioModal(true);
    };

    // 🔹 Open Edit Modal
    const openEditAudioModal = (audio: AudioFormData) => {
        setEditAudio(audio);
        setAudioModal(true);
    };

    // 🔹 Delete
    const handleDelete = async () => {
        if (!editAudio?._id) return;
        try {
            await fetch(API.AUDIOS.DELETE(editAudio._id), { method: 'DELETE' });
            setDeleteAudioModal(false);
            showToast({ type: 'success', message: 'Audio deleted!' });
            setAudios(audios.filter((a) => a._id !== editAudio._id));
        } catch (err) {
            console.error(err);
        }
    };

    const closeAudioModal = () => {
        setAudioModal(false);
        setEditAudio(null);
    };

    return (
        <div className="crud-audio-wrapper">
            <Toast ref={toastRef} />
            <CrudHeader
                title="Upload or update audio"
                fileType="Add Audio"
                onClick={openAddAudioModal}
            />

            {/* Table */}
            <div className="table">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Audio</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Cover Image</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className="table-body">
                    {audios.map((audio) => (
                        <div className="table-row" key={audio._id}>
                            <div className="table-cell">
                                <audio controls
                                    controlsList="nodownload">
                                    <source src={audio.audio} type="audio/mpeg" />
                                </audio>
                            </div>
                            <div className="table-cell">{audio.description}</div>
                            <div className="table-cell">{audio.image}</div>
                            <div className="table-cell action-buttons">
                                <img
                                    className="crud-action-icons"
                                    src="/assets/icons/ic_edit_pen_grey.svg"
                                    alt="Edit"
                                    onClick={() => openEditAudioModal(audio)}
                                />
                                <img
                                    className="crud-action-icons"
                                    src="/assets/icons/trash.svg"
                                    alt="Delete"
                                    onClick={() => {
                                        setEditAudio(audio);
                                        setDeleteAudioModal(true);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {audioModal && (
                <Modal
                    isCloseAvailable
                    isOverlayClickable
                    isOverlayVisible
                    onClose={closeAudioModal}
                >
                    <AudioModal
                        heading={editAudio ? 'Edit Audio' : 'Add Audio'}
                        onClose={closeAudioModal}
                        onSubmit={handleAudioFormSubmit}
                        initialData={editAudio ?? undefined}
                    />
                </Modal>
            )}

            {/* Delete Modal */}
            {deleteAudioModal && (
                <ConfirmationModal
                    closeModalCb={() => setDeleteAudioModal(false)}
                    modalData={{
                        title: 'Delete Audio',
                        description: 'Are you sure you want to delete this audio?',
                    }}
                    footerButtons={[
                        {
                            name: 'Cancel',
                            type: 'secondary-button',
                            clickAction: () => setDeleteAudioModal(false),
                        },
                        { name: 'Delete', type: 'primary-button', clickAction: handleDelete },
                    ]}
                />
            )}
        </div>
    );
};

export default CrudAudio;
