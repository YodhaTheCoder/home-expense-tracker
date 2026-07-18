import { useState, useEffect, useRef } from 'react';
import { formatCurrency } from '../../utils/format';
import './ExpenseDonut.css';
import { categoryColors } from '../../utils/chartColors';


export default function ExpenseDonut({ data = [] }) {

  const [selected, setSelected] = useState(null);
  const donutRef = useRef(null);

  const total = data.reduce(
    (sum,item)=>sum + item.amount,
    0
  );


  let startAngle = 0;

  
useEffect(() => {

  function handleOutsideClick(event) {

    if (
      donutRef.current &&
      !donutRef.current.contains(event.target)
    ) {
      setSelected(null);
    }

  }


  document.addEventListener(
    'mousedown',
    handleOutsideClick
  );


  return () => {
    document.removeEventListener(
      'mousedown',
      handleOutsideClick
    );
  };

}, []);


  return (

    <div className="donut-wrapper">

      <div className="donut-container"  ref={donutRef}>

        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >

        {data.map((item,index)=>{


          const angle =
            (item.amount / total) * 360;


          const endAngle =
            startAngle + angle;

const path =
  createArc(
    130,
    130,
    95,
    65,
    startAngle,
    endAngle
  );


          const isActive =
  selected !== null &&
  selected.name === item.name;


const faded =
  selected !== null &&
  !isActive;


          startAngle = endAngle;


          return (

            <path
              key={item.name}
              d={path}
              fill={categoryColors[index % categoryColors.length]}

              className={
                `
                donut-piece
                ${isActive?'active':''}
                ${faded?'faded':''}
                `
              }

             onClick={() =>
  setSelected(
    selected?.name === item.name
      ? null
      : item
  )
}

            />

          );

        })}

        </svg>



        <div className="donut-center">

          {
          selected ?
          <>
            <span>{selected.name}</span>
            <strong>
              {formatCurrency(selected.amount)}
            </strong>
          </>
          :
          <>
            <span>Total</span>
            <strong>
              {formatCurrency(total)}
            </strong>
          </>
          }

        </div>

      </div>

    </div>
  );
}



function createArc(
  cx,
  cy,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle
){

  const startOuter =
    polar(cx,cy,outerRadius,startAngle);

  const endOuter =
    polar(cx,cy,outerRadius,endAngle);


  const startInner =
    polar(cx,cy,innerRadius,endAngle);

  const endInner =
    polar(cx,cy,innerRadius,startAngle);


  const large =
    endAngle-startAngle > 180 ? 1 : 0;


  return `
  M ${startOuter.x} ${startOuter.y}
  A ${outerRadius} ${outerRadius} 0 ${large} 1 ${endOuter.x} ${endOuter.y}
  L ${startInner.x} ${startInner.y}
  A ${innerRadius} ${innerRadius} 0 ${large} 0 ${endInner.x} ${endInner.y}
  Z
  `;
}



function polar(cx,cy,r,angle){

  const rad =
    (angle-90) * Math.PI/180;


  return {
    x:cx+r*Math.cos(rad),
    y:cy+r*Math.sin(rad)
  };

}