import React, { Component } from 'react';

class MotionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            script: props.script,
            article: 'body',
            motion: null
        };

        if (props.article.includes('_'))
            this.state.article = props.article.split('_')[1];

        this.state.motion = this.state.data[this.state.article].filter(m => m.GameHash.toLowerCase() == "game_" + this.state.script.toLowerCase())[0];
    }



    static getDerivedStateFromProps(props, state) {
        if (props.article !== state.article || props.script !== state.script) {

            var article = 'body';

            if (props.article.includes('_'))
                article = props.article.split('_')[1];

            var motion = state.data[article].filter(m => m.GameHash.toLowerCase() == "game_" + props.script.toLowerCase())[0];

            return {
                script: props.script,
                article: article,
                motion: motion
            };
        }

        return null;
    }

    render() {
        if (this.state.motion) {
            return (
                <div className="motion-data">

                    {
                        this.state.motion.TransitionFrames != 0 && (
                            <div>Transition frames: {this.state.motion.TransitionFrames}</div>
                        )
                    }
                    {
                        this.state.motion.XluStart != 0 && (
                            <div>Intangibility start frame: {this.state.motion.XluStart}</div>
                        )
                    }
                    {
                        this.state.motion.XluEnd != 0 && (
                            <div>Intangibility end frame: {this.state.motion.XluEnd}</div>
                        )
                    }
                    {
                        this.state.motion.CancelFrame != 0 && (
                            <div>FAF: {this.state.motion.CancelFrame}</div>
                        )
                    }
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default MotionView;

/*
{
    this.state.motion.AnimationHashes.length > 0 && (
        <div>
            <span>Animation Files</span>
            <div>
                <ul className="animation-files-list">
                    {
                        this.state.motion.AnimationHashes.map((anim, index) => {
                            return (
                                <li key={anim}>{anim}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}*/