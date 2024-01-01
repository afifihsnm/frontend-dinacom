function FooterDashboard() {
  return (
    <div className="footer-new">
        <div className="footer-content">
            <img src="./logo-sadam.svg" alt="Logo-Sadam" />
            <p className="px-md-0 my-0">
            &copy; Copyright {new Date().getFullYear()}, Sadam
            </p>
        </div>
    </div>
  )
}

export default FooterDashboard;