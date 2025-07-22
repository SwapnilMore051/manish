import { useRef, useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import ProjectModal from '../upload-file-components/add-project-modal/project-modal';
import './crud-project.scss'
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';

const CrudProject = () => {

    const [projectModal, setProjectModal] = useState(false);
    const [editProjectModal, setEditProjectModal] = useState(false);
    const [deleteProjectModal, setDeleteProjectModal] = useState(false);
    const openProjectModal = () => setProjectModal(true);
    const toastRef = useRef<ToastRefType>(null);

    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };
    const onSubmit = () => {
        setProjectModal(false);
        showToast({ type: "success", message: "Project Uploaded successfully!" })
    };

    const onEditModalClose = () => setEditProjectModal(false);
    const editVideoModal = () => {
        setEditProjectModal(true);
    }

    const onConfirmCancel = () => {
        setDeleteProjectModal(false);
    }

    const onConfirmDelete = () => {
        setDeleteProjectModal(false);
        showToast({ type: "success", message: "Project deleted successfully!" });
    }

    const onOpenDeleteModal = () => {
        setDeleteProjectModal(true);
    }


    const closeProjectModal = () => setProjectModal(false);


    return (
        <div className='crud-project-wrapper'>
            <Toast ref={toastRef} />

            <CrudHeader
                title="Upload or update project"
                fileType="Add Project"
                onClick={openProjectModal} />

            <div>
                <div className='table'>
                    <div className='table-header'>
                        <div className='table-row'>
                            <div className="table-cell">Project Name</div>
                            <div className="table-cell">Description</div>
                            <div className="table-cell">Actions</div>
                        </div>
                    </div>
                    <div className='table-body'>
                        <div className='table-row'>
                            <div className="table-cell">Alyad Palyad</div>
                            <div className="table-cell">Foley work sample from Alyad Palyad movie</div>
                            <div className="table-cell action-buttons">
                                <img className='crud-action-icons' src="/assets/icons/ic_edit_pen_grey.svg" alt="Edit" onClick={editVideoModal} />
                                <img className='crud-action-icons' src="/assets/icons/trash.svg" alt="Delete" onClick={onOpenDeleteModal} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {projectModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeProjectModal}>
                    <ProjectModal heading="Add Project" onClose={closeProjectModal} onSubmit={onSubmit} />
                </Modal>
            }


            {editProjectModal &&
                <Modal
                    isOverlayVisible={true}
                    isCloseAvailable={true}
                    onClose={onEditModalClose}
                >

                    <ProjectModal heading="Edit Project" onClose={onEditModalClose} onSubmit={onSubmit} />

                </Modal>}

            {deleteProjectModal &&
                <ConfirmationModal
                    closeModalCb={() => setDeleteProjectModal(false)}
                    modalData={{
                        title: "Delete Project",
                        description: "Are you sure you want to delete this project?"
                    }}
                    footerButtons={[
                        {
                            name: "Cancel",
                            type: "secondary-button",
                            clickAction: onConfirmCancel
                        },
                        {
                            name: "Delete",
                            type: "primary-button",
                            clickAction: onConfirmDelete
                        }
                    ]}
                />
            }

        </div>
    )
}

export default CrudProject