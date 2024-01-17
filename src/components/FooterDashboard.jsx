import Logo_Sadam from "../assets/img/sadamnavbar.png"

function FooterDashboard() {
  return (
    <div className="footer-new">
        <div className="footer-content d-flex w-100">
            <img src={Logo_Sadam} alt="Logo-Sadam" />
            <p className="px-md-0 my-0">
            &copy; Copyright {new Date().getFullYear()}, Sadam
            </p>
        </div>
    </div>
  )
}

export default FooterDashboard;