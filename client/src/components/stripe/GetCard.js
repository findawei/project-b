import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {getCard} from '../../flux/actions/stripeActions'

 const GetCard =({getCard, stripeRedux}) => {

    useEffect(() => { 
        getCard(); 
      }, [getCard]);

// const card;
const {cards} = stripeRedux

  return (
      <div>
          {/* {stripeRedux.map(cards =>  <li
          item={cards} 
          key={cards._id}/>
          )} */}
          Something
      </div>
  );
};

const mapStateToProps = (state) => ({
    stripeRedux: state.stripeRedux
  });

export default connect(mapStateToProps, {getCard})(GetCard);