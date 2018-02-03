import React from 'react';
import { Editor, RichUtils, convertToRaw } from 'draft-js';
import EditorControls from './editor_controls';
import '../style/Draft.css';

class NodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.onChange = (editorState) => {console.log(convertToRaw(editorState.getCurrentContent())); this.props.onEditorChange(editorState);};
    this.toggleBlock = this.toggleBlock.bind(this);
    this.toggleInline = this.toggleInline.bind(this);
    this.onTab = this.onTab.bind(this);
  }

  handleKeyCommand(command, editorState) {
    // handle key presses here.
  }

  toggleBlock(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  }

  toggleInline(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
  }

  onTab(e) {
    this.onChange(RichUtils.onTab(e, this.props.editorState, 4)); // maxdepth = 4
  }


  render() {
    return (
      <div>
        {this.props.edit ?
        <EditorControls
          toggleBlock={this.toggleBlock}
          toggleInline={this.toggleInline}
          editorState={this.props.editorState}
        /> : null}
        <div className="editor" style={{resize: (this.props.edit ? 'both' : 'none')}}>
          <Editor
            readOnly={!this.props.edit}
            editorState={this.props.editorState}
            onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default NodeEditor;