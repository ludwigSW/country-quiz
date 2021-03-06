import * as React from "react";
import { Country } from "../../types";
import "./ListItem.css";
import { isCorrect } from "../../utils";
import { AppContext } from "../../context/AppContext";
export class ListItem extends React.Component<Props, State> {
  state = {
    inp: "",
    answerState: ItemState.NO_ANSWER
  };

  render() {
    const { country } = this.props;
    return (
      <div
        className="country-card"
        style={
          {
            backgroundColor:
              this.state.answerState === ItemState.CORRECT_ANSWER
                ? "#00ff00"
                : this.state.answerState === ItemState.WRONG_ANSWER
                  ? "#ff0000"
                  : null
          } as any
        }
      >
        <img className="img" src={country.Flag} />
        {this.state.answerState === ItemState.WRONG_ANSWER ||
        this.state.answerState === ItemState.CORRECT_ANSWER ? (
          <h1 className="title"> {country.Name} </h1>
        ) : (
          <input
            style={{
              borderRadius: "20px",
              margin: "5px",
              padding: "10px"
            }}
            onChange={e => this.setState({ inp: e.target.value })}
            onKeyUp={this.handleAnswer}
            placeholder="guess name"
          />
        )}
        <div className="currency">
          <p> {country.CurrencyName} </p>
          <p> {country.CurrencySymbol} </p>
        </div>
      </div>
    );
  }
  handleAnswer = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      const answer = isCorrect(this.state.inp, this.props.country.Name);
      if (answer) {
        this.props.addTotalScore();
      }
      this.setState({
        answerState: answer ? ItemState.CORRECT_ANSWER : ItemState.WRONG_ANSWER
      });
    }
    // tslint:disable-next-line:semicolon
  };
}
export default ({ country }) => (
  <AppContext.Consumer>
    {({ addTotalScore }) => (
      <ListItem country={country} addTotalScore={() => addTotalScore()} />
    )}
  </AppContext.Consumer>
);

enum ItemState {
  NO_ANSWER,
  CORRECT_ANSWER,
  WRONG_ANSWER
}

interface Props {
  country: Country;
  addTotalScore: () => null;
}

interface State {
  answerState: ItemState;
  inp: string;
}
