import { Card, Dropdown } from "react-bootstrap";
import React, { useState } from "react";

const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="dashboard-card d-flex">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex"><img src="../src/assets/icon/circle-time.svg" />Belum di tangani</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title className="d-flex"><img src="../src/assets/icon/circle-blank.svg" />Sedang di tangani</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title className="d-flex"><img src="../src/assets/icon/circle-check.svg" />Selesai</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title className="d-flex"><img src="../src/assets/icon/circle-x.svg" />Ditolak</Card.Title>
              <Card.Text>
                0 Laporan
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="dashboard-head d-flex">
          <h3>Aktivitas Terakhir</h3>
          <div className="filter">
            <Dropdown className="no-caret">
              <Dropdown.Toggle><i className="bi bi-filter" /><p>Urutkan</p></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.ItemText>Urutkan</Dropdown.ItemText>
                <Dropdown.Item href="#/action-1"><i className="bi bi-sort-up" />Terbaru</Dropdown.Item>
                <Dropdown.Item href="#/action-2"><i className="bi bi-sort-down" />Lama</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-filter-circle" />Belum ditangani</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-filter-circle" />Sedang ditangani</Dropdown.Item>
                <Dropdown.Item href="#/action-3"><i className="bi bi-filter-circle" />Selesai</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="content mt-3">
          <div className="no-activity">
            <i className="bi bi-calendar2-x"></i>
            <p>Anda belum melakukan aktivitas apapun</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;