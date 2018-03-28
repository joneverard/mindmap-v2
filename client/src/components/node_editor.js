import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import EditorControls from './editor_controls';
import ReactResizeDetector from 'react-resize-detector';
import '../style/Draft.css';

class NodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.onChange = (editorState) => {this.props.onEditorChange(editorState);};
    this.toggleBlock = this.toggleBlock.bind(this);
    this.toggleInline = this.toggleInline.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = this.onTab.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

        // _handleKeyCommand(command) {
        //   const {editorState} = this.state;
        //   const newState = RichUtils.handleKeyCommand(editorState, command);
        //   if (newState) {
        //     this.onChange(newState);
        //     return true;
        //   }
        //   return false;
        // }

        // _onTab(e) {
        //   const maxDepth = 4;
        //   this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
        // }


  handleKeyCommand(command) {
    const {editorState} = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    } else {
      return false;
    }
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

  handleResize(width, height) {
    // console.log(width, height);
    // need to make sure you take into account the width of the scroll bar. check if this varies from
    // browser to browser.
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
        <div className="editor" id="parent-div" style={{resize: (this.props.edit ? 'both' : 'none')}}>
        <ReactResizeDetector skipOnMount handleWidth handleHeight onResize={this.handleResize} />
          <Editor
            readOnly={!this.props.edit}
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            spellCheck
            onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default NodeEditor;