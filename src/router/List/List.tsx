import React from 'react'
import Card from '../../comp/Card/Card'

function List() {
  return (
    <div className='_list'>

        <div className="visual" /* style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/list/${listSrc}.jpg)`}} */></div>

        <div className="_k_wrap" data-max="1600">

            <Card max={10} /* data={filters} *//>

        </div>
        
    </div>
  )
}

export default List