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
            stickied: props.stickied
            
        }
    }


    render(){
        return (
            <div>
                <h2><a style={this.state.stickied ? {'color': 'green'} : {'color': 'red'}} href={this.state.link}>{this.state.title}</a></h2> <b>{this.state.upvotes} Upvotes</b>
            </div>
        )
    }
}

export default RedditThread