import img1 from '../assets/images/Group 240.png'
import img2 from '../assets/images/Group 399.png'
import img3 from '../assets/images/Group 323.png'
import img4 from '../assets/images/Group 322.png'


function DasboardPage() {
  return (
    <div style={{ padding: '20px 50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }} className="row">
        <div className="box">
          <h1>
            Weekly Activity
          </h1>
          <div className="img-box">
            <img src={img1} alt="img" />
          </div>
        </div>
        <div className="box">
          <h1>
            Expense Statistics
          </h1>
          <div className="img-box">
            <img src={img2} alt="img" />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px', marginTop: '30px' }} className="row">
        <div className="box">
          <h1>
            Quick Transfer
          </h1>
          <div className="img-box">
            <img src={img4} alt="" />
          </div>
        </div>
        <div className="box">
          <h1>
            Balance History
          </h1>
          <div className="img-box">
            <img src={img3} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DasboardPage