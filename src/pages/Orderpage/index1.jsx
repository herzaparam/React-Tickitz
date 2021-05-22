import React, { Component } from 'react'

export class OrderPage extends Component {
    state = {
        films: {
            movie_Id: '',
            title: '',
            Synopsis: '',
            casts: '',
            directed_By: '',
            genre: '',
            image: '',
            movie_duration: '',
            price: ''
        },

    }
    componentDidMount() {
        this.props.getUser()
        this.props.getMovie()
        const id = this.props.match.params.idfilm;
        Axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/${id}`)
            .then((res) => {
                console.log(res);
                this.setState({
                    films: res.data.result[0]
                })
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {
        const {title, price} = this.state.films
        return (
            <div></div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        allFilms: state.movieReducer.allFilms,
    }
}
const mapDispatchToProps = dispatch => ({
    getUser: () => {
        dispatch(getUser());
    },
    getMovie: () => {
        dispatch(getMovie());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
