import * as styles from '../styles/DisplayImageField.scss';

import * as React from 'react';

export interface DisplayImageFieldProps {
    label: string,
    imageURL?: string,
    editMode: boolean,
    onBlur?: Function
}

export class DisplayImageField extends React.PureComponent<DisplayImageFieldProps, {}> {
    render() {
        if (!this.props.imageURL && !this.props.editMode)
            return null;

        return <span className={styles.displayImageField}><span>{this.props.label}</span>{ !this.props.editMode ? <span><img src={this.props.imageURL} /></span> : <span><input type="text" defaultValue={this.props.imageURL ? this.props.imageURL : ""}  onBlur={this.props.onBlur ? this.props.onBlur.bind(this) : ""}/></span> }</span>;
    }
}