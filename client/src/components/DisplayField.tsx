import * as React from 'react';

export interface DisplayFieldProps {
    label: string,
    fieldVal: string,
    editMode: boolean,
    onBlur?: Function
}

export class DisplayField extends React.Component<DisplayFieldProps, {}> {
    render() {
        return <span><span>{this.props.label}</span>{ !this.props.editMode ? <span>{this.props.fieldVal}</span> : <span><input type="text" defaultValue={this.props.fieldVal} onBlur={this.props.onBlur ? this.props.onBlur.bind(this) : ""} /></span>}</span>;
    }
}