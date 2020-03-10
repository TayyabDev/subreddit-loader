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
        this.loadMore = this.loadMore.bind(this)
    }


    componentDidMount(){
        // fetch league
        fetch(`https://www.reddit.com/r/${this.state.subreddit}/hot.json?limit=10`).then(response => response.json())
        .then(response => response.data.children).then(child => {
            const x = child.map(x => <RedditThread key={shortid.generate()} title={x.data.title} date='2020' link={x.data.url} upvotes={x.data.ups} stickied={x.data.stickied} img={x.data.thumbnail}/>)
            console.log(JSON.stringify(child))
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
        if(!this.state.subreddit){
            alert("Select a valid subreddit")
            return
        }
        
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

    loadMore(e){
        e.preventDefault()
        let newPostsLength = this.state.posts.length + 10;
        console.log(newPostsLength)
        fetch(`https://www.reddit.com/r/${this.state.subreddit}/hot.json?limit=${newPostsLength}`).then(response => response.json()).then(response => response.data.children).then(child => {
            const x = child.map(x => <RedditThread key={shortid.generate()} title={x.data.title} date='2020' link={x.data.url} upvotes={x.data.ups} stickied={x.data.stickied}/>)
            console.log(JSON.stringify(child.data))
            this.setState({
                posts: x,
            })
        })


    }


    render(){
        return(
            <div>
                <div className="form-row align-items-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="col">
                            <input className="col-auto" type="search" onChange={this.handleChange} name="subreddit" value={this.state.subreddit} placeholder="leagueoflegends"/>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-primary">Show Posts</button>
                        </div>
                    </form>
                </div>
                <h1 class="text-center">Showing posts for: /r/{this.state.subredditLabel}</h1>
                {this.state.posts}
                <form className="d-flex justify-content-center" onSubmit={this.loadMore}>
                    <button className="btn btn-outline-primary">Load more</button>
                </form>
            </div>
        )
    }

}

export default Reddit