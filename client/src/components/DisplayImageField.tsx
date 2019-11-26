import * as styles from '../styles/DisplayImageField.scss';
import * as React from 'react';
import { GeneralDisplayFieldProps, GeneralDisplayFieldState, GeneralDisplayField } from './GeneralDisplayField';

export interface DisplayImageFieldProps extends GeneralDisplayFieldProps {
    imageURL?: string
}


export class DisplayImageField extends GeneralDisplayField<DisplayImageFieldProps, GeneralDisplayFieldState> {
    render() {
        if (!this.props.imageURL && !this.props.editMode)
            return null;

        return <span className={styles.displayImageField + ((this.state &&  this.state.error) ? ' ' + styles.error : '')}><span>{this.props.label}</span>{ !this.props.editMode ? <span><img src={this.props.imageURL} /></span> : <span><input type="text" defaultValue={this.props.imageURL ? this.props.imageURL : ""}  onBlur={this.props.onBlur ? this.props.onBlur.bind(this) : ""}/></span> }</span>;
    }
}