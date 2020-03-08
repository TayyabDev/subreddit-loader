import React from 'react'
import shortid from 'shortid'

import RedditThread from './RedditThread'
class Reddit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            subreddit: 'leagueoflegends',
            subredditLabel: 'leagueoflegends',
            posts: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount(){
        // fetch league
        fetch(`https://www.reddit.com/r/${this.state.subreddit}/hot.json?limit=10`).then(response => response.json())
        .then(response => response.data.children).then(child => {
            const x = child.map(x => <RedditThread key={shortid.generate()} title={x.data.title} date='2020' link={x.data.url} upvotes={x.data.ups} stickied={x.data.stickied}/>)
            console.log(JSON.stringify(child.data))
            this.setState({
                posts: x
            })
        })
            // .then(json => this.setState(
            //     {
            //         posts: json.data.map(obj => <h1>Hello</h1>)
            //         // <RedditThread title="hey" date='he' link='s' upvotes='0'/>
            //     }
        
    }


    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        console.log('here')
        fetch(`https://www.reddit.com/r/${this.state.subreddit}/hot.json?limit=10`).then(response => response.json())
        .then(response => response.data.children).then(child => {
            const x = child.map(x => <RedditThread key={shortid.generate()} title={x.data.title} date='2020' link={x.data.url} upvotes={x.data.ups} stickied={x.data.stickied}/>)
            console.log(JSON.stringify(child.data))
            this.setState({
                posts: x,
                subredditLabel: this.state.subreddit
            })
        })
    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} name="subreddit" value={this.state.subreddit} placeholder="leagueoflegends"/>
                    <button>Show Posts</button>
                </form>
                <h1>Showing posts for: {this.state.subredditLabel}</h1>
                {this.state.posts}
            </div>
        )
    }

}

export default Reddit