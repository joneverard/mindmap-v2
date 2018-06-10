import React, { Component } from 'react';

export default function Benefits(props) {
	return (
		<section className="key-benefits container">
			<div className="row">
				<div className="four columns centered full-height">
					<div className="key-benefit-card">
						<i className="fa fa-calendar-check-o" aria-hidden="true"></i>
						<h5>Get Organised</h5>
						<p>Our simple, easy to use design allows you to focus on your information and get organised.</p>
					</div>
				</div>
				<div className="four columns centered full-height">
					<div className="key-benefit-card">
						<i className="fa fa-map-o" aria-hidden="true"></i>
						<h5>See the whole picture</h5>
						<p>Zoom out and see all your notes at a glance.</p>
					</div>
				</div>
				<div className="four columns centered full-height">
					<div className="key-benefit-card">
						<i className="fa fa-lightbulb-o" aria-hidden="true"></i>
						<h5>Find new ideas</h5>
						<p>See how each note is connected and watch ideas jump out of the screen.</p>
					</div>
				</div>
			</div>
		</section>
	)
}




