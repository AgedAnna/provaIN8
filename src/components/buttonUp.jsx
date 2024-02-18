import React from "react";
import { UpCircleOutlined } from "@ant-design/icons";
import "./ScrollToTopButton.css";

class ScrollToTopButton extends React.Component {
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <div className="up">
        <button onClick={this.scrollToTop} className="scrollUp">
          <UpCircleOutlined />
        </button>
      </div>
    );
  }
}

export default ScrollToTopButton;
