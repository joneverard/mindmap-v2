import React, { Component } from 'react';

class QuickStart extends Component {
	// need to:
	// build outline for frames
	// buttons in bottom of screen
	// gif in centre of page
	// text as well?

	// actions:
	// 	skip, back and next
	//  likely to be kept on the app component...
	//  OR... just have it all in state, within this component.
	// state it is...

	// parts needed
	// img div in centre of screen
	// control buttons, full width at bottom of screen

	constructor(props) {
		super(props);
		this.state = {
			message: 'hello look at this text here for some useful tips',
			pages: [
				{
					id: 0,
					text:
						'Lost? You can find your maps and create new ones from the side-menu in the top left.',
					url:
						'https://s3.eu-west-2.amazonaws.com/notemaps-public/notemaps-side-menu.mp4'
				},
				{
					id: 1,
					text:
						'Create new notes using the add note button and place them anywhere.',
					url:
						'https://s3.eu-west-2.amazonaws.com/notemaps-public/notemaps-create-new-note.mp4'
				},
				{
					id: 2,
					text: 'Expand the note using the arrow to add details to your note.',
					url:
						'https://s3.eu-west-2.amazonaws.com/notemaps-public/notemaps-add-details.mp4'
				},
				{
					id: 3,
					text:
						'Draw connections between notes to visualise the links between them.',
					url:
						'https://s3.eu-west-2.amazonaws.com/notemaps-public/notemaps-connect.mp4'
				},
				{
					id: 4,
					text:
						'Left click and drag anywhere in blank space to move the whole map around.',
					url:
						'https://s3.eu-west-2.amazonaws.com/notemaps-public/notemaps-drag-around.mp4'
				},
				{
					id: 5,
					text:
						'Need some space? Or to see the big picture? Use the mouse wheel to zoom in and out.',
					url:
						'https://s3.eu-west-2.amazonaws.com/notemaps-public/notemaps-zoom.mp4'
				}
			],
			current: 0,
			intro: true
		};
		this.back = this.back.bind(this);
		this.next = this.next.bind(this);
	}

	back(current) {
		if (this.state.current !== 0) {
			this.setState({ current: current - 1 });
		}
	}

	next(current) {
		if (this.state.current !== 5) {
			this.setState({ current: current + 1 });
		} else if (this.state.current === 5) {
			this.props.skip();
		}
	}

	renderIntro() {
		return (
			<div className={this.props.show ? "quick-start-container show" : "quick-start-container"}>
				<div className="quick-start-outer">
					<div className="quick-start-intro">
						<h4>
							We noticed this is your first time here, why not let us show you
							around?
						</h4>
						<div className="quick-start-intro-btns">
							<button
								className="cta-orange"
								onClick={e => {
									this.setState({ intro: false });
								}}>
								show me the ropes!
							</button>
							<button
								onClick={e => {
									this.props.skip();
								}}>
								No thanks
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderPages() {
		return (
			<div className={this.props.show ? "quick-start-container show" : "quick-start-container"}>
				<div className="quick-start-img">
					<div className="quick-start-img-inner">
						<video
							autoPlay
							loop
							src={this.state.pages[this.state.current].url}
							type="video/mp4">
							<p>
								Your browser doesn't support HTML5 video. Here is a
								<a href={this.state.pages[this.state.current].url}>link to the video</a> instead.
							</p>
						</video>
					</div>
				</div>
				<div className="quick-start-txt">
					<h4>{this.state.pages[this.state.current].text}</h4>
				</div>
				<div className="quick-start-controls">
					<button
						onClick={e => {
							this.back(this.state.current);
						}}>
						back
					</button>
					<button
						onClick={e => {
							this.next(this.state.current);
						}}
						className="cta-orange">
						next
					</button>
					<button
						onClick={e => {
							this.props.skip();
						}}>
						skip
					</button>
				</div>
			</div>
		);
	}

	render() {
		return this.state.intro ? this.renderIntro() : this.renderPages();
	}
}

export default QuickStart;
