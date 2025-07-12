import CrudHeader from '../crud-header/crud-header';
import './crud-project.scss'

const CrudProject = () => {
    return (
        <div className='crud-project-wrapper'>

            <CrudHeader
                title="Upload or update project"
                fileType="Add Project"
                onClick={() => {
                    console.log("add project");
                }} />
            project
        </div>
    )
}

export default CrudProject