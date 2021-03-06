import React, { Component } from 'react';
// import { Editor, EditorState, RichUtils } from 'draft-js';
import '../style/Draft.css';

const blockStyles = [
    { display: 'list-ul', style: 'unordered-list-item' },
    { display: 'list-ol', style: 'ordered-list-item' }
];

const inlineStyles = [
    { display: 'bold', style: 'BOLD' },
    { display: 'italic', style: 'ITALIC' },
    { display: 'underline', style: 'UNDERLINE' }
];


class StyleButton extends Component {
    constructor(props) {
        super(props);
        this.onToggle = e => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        var className = `fa fa-${this.props.display}`;
        //editor-style-btn
        return (
            <div
                className={
                    this.props.active
                        ? 'icon-btn editor-style-btn-active'
                        : 'icon-btn'
                }
                onMouseDown={this.onToggle}>
                <i className={className} aria-hidden="true" />
            </div>
        );
    }
}

class EditorControls extends Component {
    render() {
        const contentSelection = this.props.editorState.getSelection();
        const blockType = this.props.editorState
            .getCurrentContent()
            .getBlockForKey(contentSelection.getStartKey())
            .getType();
        var currentStyle = this.props.editorState.getCurrentInlineStyle();
        return (
            <div className="editor-controls">
                {inlineStyles.map(styleBtn => {
                    return (
                        <StyleButton
                            onToggle={this.props.toggleInline}
                            key={styleBtn.display}
                            style={styleBtn.style}
                            display={styleBtn.display}
                            active={currentStyle.has(styleBtn.style)}
                        />
                    );
                })}
                {blockStyles.map(styleBtn => {
                    return (
                        <StyleButton
                            onToggle={this.props.toggleBlock}
                            key={styleBtn.display}
                            style={styleBtn.style}
                            display={styleBtn.display}
                            active={styleBtn.style === blockType}
                        />
                    );
                })}
            </div>
        );
    }
}

export default EditorControls;
// need a button component, which can be passed which type it is, bold, italic etc...
// or at least
