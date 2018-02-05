import React from 'react';
import ReactDOM from 'react-dom';
import countries from './zadanieX_00';

const allCountries = countries.map((country) => {
    return (
        <option	key={country.code} value={country.name}>
            {country.name} ({country.code})
        </option>
    )
});

class Country extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input : '',
            shownCountries: allCountries,
            choise: '',
        };
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    handleInputChange = event => {

        let selectedCountries = countries.filter(item =>
            item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0 ||
            item.code.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0);

        let shownSelectedCountries = selectedCountries.map((country) => {
            return (
                <option key={country.code} value={country.name}>
                    {country.name} ({country.code})
                </option>
            )
        });

        this.setState({
            input : event.target.value,
            shownCountries: shownSelectedCountries,
        });
    };

    handleCountryChange = event => {

        this.setState({
            choise : event.target.value,
            input : event.target.value,
        })
    };

    handleInputBlur = event => {

        if(this.state.shownCountries.length < 1) {
            this.setState({
                input: '',
            })
        }
    };

    render() {
        return <form>
            <label>Kraj:
                <input className="form-control form-control-lg"
                       style={{fontSize: "3rem"}}
                       type="text"
                       value={this.state.input}
                       onChange={this.handleInputChange}
                       placeholder="Tutaj wpisz kraj"
                       ref={(input) => { this.nameInput = input; }}
                       onBlur={this.handleInputBlur} />
            </label>
            <br/>
            <label>
                <h2>Kraje do wyboru:</h2>
                <select value={this.state.choise}
                        onChange={this.handleCountryChange}>
                    {this.state.shownCountries}
                </select>
            </label>
        </form>
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Country />,
        document.getElementById('app')
    );
});