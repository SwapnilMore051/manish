import { useState } from 'react';
import Modal from '../../../components/modal/modal';
import CrudHeader from '../crud-header/crud-header';
import ProjectModal from '../upload-file-components/add-project-modal/project-modal';
import './crud-project.scss'

const CrudProject = () => {

    const [projectModal, setProjectModal] = useState(false);
    const openProjectModal = () => setProjectModal(true);
    const closeProjectModal = () => setProjectModal(false);

    return (
        <div className='crud-project-wrapper'>

            <CrudHeader
                title="Upload or update project"
                fileType="Add Project"
                onClick={openProjectModal} />

            {projectModal &&
                <Modal isCloseAvailable={true} isOverlayClickable={true} isOverlayVisible={true} onClose={closeProjectModal}>
                    <ProjectModal />
                </Modal>
            }
            project
        </div>
    )
}

export default CrudProject