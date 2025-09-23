import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import ProjectModal from '../upload-file-components/add-project-modal/project-modal';
import './crud-project.scss';
import type { ToastRefType } from '../../../components/models/toast';
import Toast from '../../../components/toast/toast';
import ConfirmationModal from '../../../components/confirmation-modal/confirmation-modal';
import API from '../../../api/endpoints';

const CrudProject = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [activeModal, setActiveModal] = useState<'add' | 'edit' | null>(null);
    const [editProject, setEditProject] = useState<any | null>(null);
    const [deleteProject, setDeleteProject] = useState<any | null>(null);
    const toastRef = useRef<ToastRefType>(null);

    const showToast = ({ type, message }: any) => {
        toastRef?.current?.showToast({ type, message });
    };

    // Fetch projects on mount
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(API.PROJECTS.GET_ALL);
            setProjects(res.data.data);
        } catch (err) {
            console.error(err);
            showToast({ type: 'error', message: 'Failed to fetch projects' });
        }
    };

    // Add Modal
    const openAddProjectModal = () => setActiveModal('add');

    // Edit Modal
    const openEditProjectModal = (project: any) => {
        setEditProject(project);
        setActiveModal('edit');
    };

    const closeModal = () => {
        setActiveModal(null);
        setEditProject(null);
        setDeleteProject(null);
    };

    // Add / Edit Project
    const handleSubmit = async (
        data: { name: string; description: string; link: string; cover_image: string },
        projectId?: string
    ) => {
        try {
            if (projectId) {
                await axios.put(API.PROJECTS.UPDATE(projectId), data);
                showToast({ type: 'success', message: 'Project updated successfully!' });
            } else {
                await axios.post(API.PROJECTS.CREATE, data);
                showToast({ type: 'success', message: 'Project added successfully!' });
            }
            closeModal();
            fetchProjects();
        } catch (err) {
            console.error(err);
            showToast({ type: 'error', message: 'Something went wrong!' });
        }
    };

    // Delete project
    const handleDelete = async (projectId: string) => {
        try {
            await axios.delete(API.PROJECTS.DELETE(projectId));
            showToast({ type: 'success', message: 'Project deleted successfully!' });
            closeModal();
            fetchProjects();
        } catch (err) {
            console.error(err);
            showToast({ type: 'error', message: 'Failed to delete project' });
        }
    };

    return (
        <div className='crud-project-wrapper'>
            <Toast ref={toastRef} />

            <CrudHeader
                title="Upload or update project"
                fileType="Add Project"
                onClick={openAddProjectModal}
            />

            {/* Projects Table */}
            <div className='table'>
                <div className='table-header'>
                    <div className='table-row'>
                        <div className="table-cell">Project Name</div>
                        <div className="table-cell">Description</div>
                        <div className="table-cell">Link</div>
                        <div className="table-cell">Actions</div>
                    </div>
                </div>
                <div className='table-body'>
                    {projects.map((project) => (
                        <div className='table-row' key={project._id}>
                            <div className="table-cell">{project.name}</div>
                            <div className="table-cell">{project.description}</div>
                            <div className="table-cell">
                                {project.link == 0 ?
                                    <>No Link</> :
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                                }

                            </div>
                            <div className="table-cell action-buttons">
                                <img
                                    className='crud-action-icons'
                                    src="/assets/icons/ic_edit_pen_grey.svg"
                                    alt="Edit"
                                    onClick={() => openEditProjectModal(project)}
                                />
                                <img
                                    className='crud-action-icons'
                                    src="/assets/icons/trash.svg"
                                    alt="Delete"
                                    onClick={() => setDeleteProject(project)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add / Edit Project Modal */}
            {(activeModal === 'add' || activeModal === 'edit') && (
                <Modal
                    isCloseAvailable={true}
                    isOverlayClickable={true}
                    isOverlayVisible={true}
                    onClose={closeModal}
                >
                    <ProjectModal
                        heading={activeModal === 'add' ? 'Add Project' : 'Edit Project'}
                        onClose={closeModal}
                        onSubmit={(data: any) =>
                            handleSubmit(data, activeModal === 'edit' ? editProject?._id : undefined)
                        }
                        project={editProject}
                    />
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {deleteProject && (
                <ConfirmationModal
                    closeModalCb={closeModal}
                    modalData={{
                        title: "Delete Project",
                        description: `Are you sure you want to delete "${deleteProject.name}"?`
                    }}
                    footerButtons={[
                        {
                            name: "Cancel",
                            type: "secondary-button",
                            clickAction: closeModal
                        },
                        {
                            name: "Delete",
                            type: "primary-button",
                            clickAction: () => handleDelete(deleteProject._id)
                        }
                    ]}
                />
            )}
        </div>
    );
};

export default CrudProject;
