import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../components/modal/modal";
import CrudHeader from "../crud-header/crud-header";
import GalleryModal from "../upload-file-components/add-gallery-modal/gallery-modal";
import "./crud-gallery.scss";
import type { ToastRefType } from "../../../components/models/toast";
import Toast from "../../../components/toast/toast";
import ConfirmationModal from "../../../components/confirmation-modal/confirmation-modal";
import API from "../../../api/endpoints";

const CrudGallery = () => {
    const [uploadGalleryModal, setUploadGalleryModal] = useState(false);
    const [editGalleryModal, setEditGalleryModal] = useState(false);
    const [deleteGalleryModal, setDeleteGalleryModal] = useState(false);

    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const toastRef = useRef<ToastRefType>(null);
    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };

    // ✅ Fetch gallery
    const fetchGallery = async () => {
        try {
            const res = await axios.get(API.GALLERY.GET_ALL);
            setGalleryItems(res.data.data || []);
        } catch (err) {
            console.error(err);
            showToast({ type: "error", message: "Failed to fetch gallery items" });
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    // ✅ Submit new gallery
    const onUploadSubmit = async (data: any) => {
        try {
            await axios.post(API.GALLERY.CREATE, data);
            showToast({ type: "success", message: "Gallery item uploaded successfully!" });
            setUploadGalleryModal(false);
            fetchGallery();
        } catch (err) {
            showToast({ type: "error", message: "Upload failed" });
        }
    };

    // ✅ Submit edit
    const onEditSubmit = async (data: any) => {
        if (!selectedItem) return;
        try {
            await axios.put(API.GALLERY.UPDATE(selectedItem._id), data);
            showToast({ type: "success", message: "Gallery item updated successfully!" });
            setEditGalleryModal(false);
            fetchGallery();
        } catch (err) {
            showToast({ type: "error", message: "Update failed" });
        }
    };

    // ✅ Delete item
    const onConfirmDelete = async () => {
        if (!selectedItem) return;
        try {
            await axios.delete(API.GALLERY.DELETE(selectedItem._id));
            showToast({ type: "success", message: "Gallery item deleted successfully!" });
            setDeleteGalleryModal(false);
            fetchGallery();
        } catch (err) {
            showToast({ type: "error", message: "Delete failed" });
        }
    };

    const getDirectDriveLink = (url: string) => {
        if (!url) return null;
        const match = url.match(/\/d\/(.*?)\//);
        return match
            ? `https://drive.google.com/uc?export=download&id=${match[1]}`
            : url;
    };

    return (
        <div className="crud-gallery-wrapper">
            <CrudHeader
                title="Upload or update gallery"
                fileType="Add Gallery"
                onClick={() => setUploadGalleryModal(true)}
            />

            {/* Upload Modal */}
            {uploadGalleryModal && (
                <Modal
                    isCloseAvailable={true}
                    isOverlayClickable={true}
                    isOverlayVisible={true}
                    onClose={() => setUploadGalleryModal(false)}
                >
                    <GalleryModal
                        heading="Upload File"
                        onClose={() => setUploadGalleryModal(false)}
                        onSubmit={onUploadSubmit}
                    />
                </Modal>
            )}

            {/* Edit Modal */}
            {editGalleryModal && selectedItem && (
                <Modal
                    isCloseAvailable={true}
                    isOverlayClickable={true}
                    isOverlayVisible={true}
                    onClose={() => setEditGalleryModal(false)}
                >
                    <GalleryModal
                        heading="Edit File"
                        onClose={() => setEditGalleryModal(false)}
                        onSubmit={onEditSubmit}
                        initialData={selectedItem}
                    />
                </Modal>
            )}

            <Toast ref={toastRef} />

            {/* Table */}
            <div className="table">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Preview</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className="table-body">
                    {galleryItems.map((item) => (
                        <div className="table-row" key={item._id}>
                            <div className="table-cell">
                                {item.url && item.type === "image" && (
                                    <img
                                        src={getDirectDriveLink(item.url) || undefined}
                                        alt="Gallery item"
                                        style={{ width: "120px", height: "auto", borderRadius: "8px" }}
                                    />
                                )}

                                {item.url && item.type === "video" && (
                                    <video
                                        width="200"
                                        height="150"
                                        controls
                                        style={{ borderRadius: "8px" }}
                                    >
                                        <source src={getDirectDriveLink(item.url) || undefined} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>

                            <div className="table-cell">{item.description}</div>
                            <div className="table-cell action-buttons">
                                <img
                                    className="crud-action-icons"
                                    src="/assets/icons/ic_edit_pen_grey.svg"
                                    alt="Edit"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setEditGalleryModal(true);
                                    }}
                                />
                                <img
                                    className="crud-action-icons"
                                    src="/assets/icons/trash.svg"
                                    alt="Delete"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setDeleteGalleryModal(true);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Confirmation */}
            {deleteGalleryModal && (
                <ConfirmationModal
                    closeModalCb={() => setDeleteGalleryModal(false)}
                    modalData={{
                        title: "Delete Gallery Item",
                        description: "Are you sure you want to delete this item?",
                    }}
                    footerButtons={[
                        {
                            name: "Cancel",
                            type: "secondary-button",
                            clickAction: () => setDeleteGalleryModal(false),
                        },
                        {
                            name: "Delete",
                            type: "primary-button",
                            clickAction: onConfirmDelete,
                        },
                    ]}
                />
            )}
        </div>
    );
};

export default CrudGallery;
