import React, { Component } from "react";
import "./Rules.css";

/**
 * Display the rules of the game
 * // just a link for now
 *
 * @export
 * @class Rules
 * @extends {Component}
 */
export default class Rules extends Component {
  render() {
    return (
      <span className="rules">
        <a
          href="https://en.wikipedia.org/wiki/Snakes_and_Ladders"
          target="_blank"
        >
          History & Rules
        </a>
      </span>
    );
  }
}
