import React, { Component } from 'react';

class ButtonCustom extends Component {

  render() {
    const { 
      children,
      className,
      btnId,
      disabled,
      onClick,
      type
    } = this.props

    return (
      <button className={ className } 
              id={ btnId } 
              type={ type }
              disabled={disabled}
              onClick={onClick}>
        { children &&  
          <span>
            { children }
          </span>   
        }
      </button>
    )
  };
}

export default ButtonCustom;