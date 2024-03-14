/* eslint-disable */
import './styles.scss'

function Button({ text, className, ...props }) {
    const classData = `btn ${className}`;
    return (
        <div className={'button'} {...props}>
            <div className="container">
                <div className={classData}><p style={{marginTop: '0px', cursor: 'pointer'}}>{text}</p></div>
            </div>
        </div>
    );
}

export default Button;