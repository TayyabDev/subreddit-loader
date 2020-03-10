import React from 'react'
import Reddit from './Reddit'


class RedditThread extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            title: props.title,
            date: props.date,
            link: props.link,
            upvotes: props.upvotes,
            stickied: props.stickied,
            img: props.img
        }
    }


    render(){
        return (
            <div className="card">
                <div>
                    <h2 className="card-body d-flex justify-content-center"><a style={this.state.stickied ? {'color': 'green'} : {'color': 'red'}} href={this.state.link}>{this.state.title}</a></h2>
                    <p className="card-body d-flex justify-content-center"><b>{this.state.upvotes} Upvotes</b></p>
                </div>
            </div>
        )
    }
}

export default RedditThread