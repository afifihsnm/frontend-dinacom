
function AkunPage() {
  return (
    <div className="akun">
      <div className="akun-content">
        <h1>Akun</h1>
        <div className="akun-category">
          <div className="akun-category-publik">
            <h2>Publik</h2>
            <p>Data yang dapat dilihat oleh publik.</p>
            <hr />
            
          </div>
          <div className="akun-category-pribadi">
            <h2>Pribadi</h2>
            <p>Informasi pribadi</p>
            <hr/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AkunPage;