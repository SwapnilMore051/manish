import { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import GalleryModal from '../upload-file-components/add-gallery-modal/gallery-modal';
import './crud-gallery.scss';
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';
import API from '../../../api/endpoints';

type GalleryFormData = {
    _id?: string;
    image: string;
    description: string;
};

const CrudGallery = () => {
    const [gallery, setGallery] = useState<GalleryFormData[]>([]);
    const [galleryModal, setGalleryModal] = useState(false);
    const [editGallery, setEditGallery] = useState<GalleryFormData | null>(null);
    const [deleteGalleryModal, setDeleteGalleryModal] = useState(false);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };

    // Fetch all gallery items
    const fetchGallery = async () => {
        try {
            const res = await fetch(API.GALLERY.GET_ALL);
            const result = await res.json();
            if (result.status === 'success') {
                setGallery(result.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    // Add / Update
    const handleGalleryFormSubmit = async (data: GalleryFormData) => {
        try {
            const method = data._id ? 'PUT' : 'POST';
            const url = data._id ? API.GALLERY.UPDATE(data._id) : API.GALLERY.CREATE;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast({
                    type: 'success',
                    message: data._id ? 'Gallery updated!' : 'Gallery added!',
                });
                setGalleryModal(false);
                setEditGallery(null);
                fetchGallery();
            } else {
                showToast({ type: 'error', message: 'Failed to save gallery item.' });
            }
        } catch (err) {
            console.error(err);
            showToast({ type: 'error', message: 'Error saving gallery item.' });
        }
    };

    // Open Add Modal
    const openAddGalleryModal = () => {
        setEditGallery(null);
        setGalleryModal(true);
    };

    // Open Edit Modal
    const openEditGalleryModal = (item: GalleryFormData) => {
        setEditGallery(item);
        setGalleryModal(true);
    };

    // Delete
    const handleDelete = async () => {
        if (!editGallery?._id) return;
        try {
            await fetch(API.GALLERY.DELETE(editGallery._id), { method: 'DELETE' });
            setDeleteGalleryModal(false);
            showToast({ type: 'success', message: 'Gallery item deleted!' });
            setGallery(gallery.filter((g) => g._id !== editGallery._id));
        } catch (err) {
            console.error(err);
        }
    };

    const closeGalleryModal = () => {
        setGalleryModal(false);
        setEditGallery(null);
    };

    return (
        <div className="crud-gallery-wrapper">
            <Toast ref={toastRef} />
            <CrudHeader
                title="Upload or update gallery"
                fileType="Add Gallery"
                onClick={openAddGalleryModal}
            />

            {/* Table */}
            <div className="table">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Image</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Link</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className="table-body">
                    {gallery.map((item) => (
                        <div className="table-row" key={item._id}>
                            <div className="table-cell">
                                <img
                                    src={item.image}
                                    alt="Gallery item"
                                    style={{ width: '120px', height: 'auto' }}
                                />
                            </div>
                            <div className="table-cell">{item.description}</div>
                            <div className="table-cell">{item.image}</div>
                            <div className="table-cell action-buttons">
                                <img
                                    className="crud-action-icons"
                                    src="/assets/icons/ic_edit_pen_grey.svg"
                                    alt="Edit"
                                    onClick={() => openEditGalleryModal(item)}
                                />
                                <img
                                    className="crud-action-icons"
                                    src="/assets/icons/trash.svg"
                                    alt="Delete"
                                    onClick={() => {
                                        setEditGallery(item);
                                        setDeleteGalleryModal(true);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {galleryModal && (
                <Modal
                    isCloseAvailable
                    isOverlayClickable
                    isOverlayVisible
                    onClose={closeGalleryModal}
                >
                    <GalleryModal
                        heading={editGallery ? 'Edit Gallery' : 'Add Gallery'}
                        onClose={closeGalleryModal}
                        onSubmit={handleGalleryFormSubmit}
                        initialData={editGallery ?? undefined}
                    />
                </Modal>
            )}

            {/* Delete Modal */}
            {deleteGalleryModal && (
                <ConfirmationModal
                    closeModalCb={() => setDeleteGalleryModal(false)}
                    modalData={{
                        title: 'Delete Gallery Item',
                        description: 'Are you sure you want to delete this item?',
                    }}
                    footerButtons={[
                        {
                            name: 'Cancel',
                            type: 'secondary-button',
                            clickAction: () => setDeleteGalleryModal(false),
                        },
                        { name: 'Delete', type: 'primary-button', clickAction: handleDelete },
                    ]}
                />
            )}
        </div>
    );
};

export default CrudGallery;
