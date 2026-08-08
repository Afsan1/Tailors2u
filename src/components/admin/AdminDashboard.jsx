'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function AdminDashboard({ adminUserEmail }) {
  // State management
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED, USERS
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all'); // all, today
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest
  const [page, setPage] = useState(1);

  // Mobile menu drawer state
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, today: 0, total: 0 });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4500);
  };

  // Fetch bookings from server
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        status: activeTab === 'USERS' ? 'ALL' : activeTab,
        search: searchQuery,
        filter: dateFilter,
        sort: sortOrder,
        page: page.toString(),
        limit: '10',
      });

      const res = await fetch(`/api/admin/bookings?${queryParams.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings || []);
        setStats(data.stats || { pending: 0, approved: 0, rejected: 0, today: 0, total: 0 });
        setPagination(data.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 });
      } else {
        showToast(data.message || 'Failed to fetch bookings', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error connecting to server', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchQuery, dateFilter, sortOrder, page]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setIsMobileNavOpen(false);
  };

  // Handler for Approve action
  const handleOpenApproveModal = (booking) => {
    setSelectedBooking(booking);
    setIsApproveModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (!selectedBooking) return;
    setIsSubmittingAction(true);

    try {
      const res = await fetch('/api/admin/bookings/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: selectedBooking.id }),
      });
      const data = await res.json();

      if (data.success) {
        showToast('Booking Approved. Confirmation email sent successfully.', 'success');
        setIsApproveModalOpen(false);
        setSelectedBooking(null);
        fetchBookings();
      } else {
        showToast(data.message || 'Approval failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error approving booking.', 'error');
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Handler for Reject action
  const handleOpenRejectModal = (booking) => {
    setSelectedBooking(booking);
    setRejectionReason('');
    setRejectionError('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!selectedBooking) return;
    if (!rejectionReason.trim()) {
      setRejectionError('Rejection reason is required.');
      return;
    }

    setIsSubmittingAction(true);
    setRejectionError('');

    try {
      const res = await fetch('/api/admin/bookings/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          reason: rejectionReason.trim(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        showToast('Booking Rejected. Rejection email sent.', 'info');
        setIsRejectModalOpen(false);
        setSelectedBooking(null);
        setRejectionReason('');
        fetchBookings();
      } else {
        setRejectionError(data.message || 'Rejection failed.');
      }
    } catch (err) {
      console.error(err);
      setRejectionError('Error rejecting booking.');
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Details Modal
  const handleOpenDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return (
          <span className="admin-badge badge-approved">
            <span className="dot-indicator dot-approved"></span>
            Confirmed
          </span>
        );
      case 'REJECTED':
        return (
          <span className="admin-badge badge-rejected">
            <span className="dot-indicator dot-rejected"></span>
            Rejected
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="admin-badge badge-pending">
            <span className="dot-indicator dot-pending"></span>
            Pending Approval
          </span>
        );
    }
  };

  const renderSidebarContent = () => (
    <>
      <div className="admin-sidebar-header">
        <div className="admin-logo-mark">T2U</div>
        <div className="admin-logo-text">
          <h2>Tailors2U</h2>
          <span>EXECUTIVE PORTAL</span>
        </div>
        {isMobileNavOpen && (
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close Mobile Navigation"
          >
            &times;
          </button>
        )}
      </div>

      <nav className="admin-nav">
        <button
          className={`admin-nav-item ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => handleTabChange('ALL')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Dashboard Overview</span>
        </button>
        <button
          className={`admin-nav-item ${activeTab === 'PENDING' ? 'active' : ''}`}
          onClick={() => handleTabChange('PENDING')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Pending Bookings</span>
          {stats.pending > 0 && <span className="nav-counter count-pending">{stats.pending}</span>}
        </button>
        <button
          className={`admin-nav-item ${activeTab === 'APPROVED' ? 'active' : ''}`}
          onClick={() => handleTabChange('APPROVED')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>Approved</span>
          {stats.approved > 0 && <span className="nav-counter count-approved">{stats.approved}</span>}
        </button>
        <button
          className={`admin-nav-item ${activeTab === 'REJECTED' ? 'active' : ''}`}
          onClick={() => handleTabChange('REJECTED')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          <span>Rejected</span>
        </button>
        <button
          className={`admin-nav-item ${activeTab === 'USERS' ? 'active' : ''}`}
          onClick={() => handleTabChange('USERS')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>Users & Customers</span>
        </button>
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-footer-link" onClick={() => setIsMobileNavOpen(false)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>View Website</span>
        </Link>
        <button
          className="admin-logout-btn"
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-root-container">
      {/* Toast Notification Banner */}
      {toast.show && (
        <div className={`admin-toast admin-toast-${toast.type} animate-slide-down`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Desktop Sidebar (visible >= 1024px) */}
      <aside className="admin-sidebar desktop-sidebar-only">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Overlay & Sidebar (visible < 1024px when open) */}
      {isMobileNavOpen && (
        <div className="admin-mobile-overlay animate-fade-in" onClick={() => setIsMobileNavOpen(false)}>
          <aside className="admin-mobile-drawer animate-slide-right" onClick={(e) => e.stopPropagation()}>
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Workspace */}
      <main className="admin-main-content">
        {/* Top Navbar */}
        <header className="admin-topnav">
          <div className="topnav-left-group">
            {/* Mobile Hamburger Button */}
            <button
              className="admin-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <div className="admin-search-wrapper">
              <svg className="search-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="admin-search-input"
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery('')}>&times;</button>
              )}
            </div>
          </div>

          <div className="admin-topnav-right">
            <div className="admin-notif-btn" title="System Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              {stats.pending > 0 && <span className="notif-dot"></span>}
            </div>

            <div className="admin-profile-pill">
              <div className="admin-avatar">
                <span>A</span>
              </div>
              <div className="admin-profile-info">
                <span className="admin-user-name">Tailors2U Admin</span>
                <span className="admin-user-email">Executive Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <div className="admin-dashboard-body">
          {/* Header section */}
          <div className="dashboard-page-title-row">
            <div>
              <h1 className="dashboard-page-title">Executive Control Center</h1>
              <p className="dashboard-page-subtitle">Review, approve, and manage doorstep tailoring requests</p>
            </div>
            <button className="btn-refresh" onClick={fetchBookings} disabled={isLoading}>
              Refresh Data
            </button>
          </div>

          {/* Statistics Cards */}
          <section className="stats-grid">
            <div className="stat-card stat-pending" onClick={() => handleTabChange('PENDING')}>
              <div className="stat-header">
                <span className="stat-title">Pending Bookings</span>
                <span className="stat-dot dot-pending"></span>
              </div>
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-footer">Requires executive review</div>
            </div>

            <div className="stat-card stat-today" onClick={() => { setDateFilter(dateFilter === 'today' ? 'all' : 'today'); setPage(1); }}>
              <div className="stat-header">
                <span className="stat-title">Today's Bookings</span>
                <span className="stat-dot dot-today"></span>
              </div>
              <div className="stat-value">{stats.today}</div>
              <div className="stat-footer">{dateFilter === 'today' ? 'Filtered for today' : 'Scheduled for today'}</div>
            </div>

            <div className="stat-card stat-approved" onClick={() => handleTabChange('APPROVED')}>
              <div className="stat-header">
                <span className="stat-title">Approved</span>
                <span className="stat-dot dot-approved"></span>
              </div>
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-footer">Confirmed appointments</div>
            </div>

            <div className="stat-card stat-rejected" onClick={() => handleTabChange('REJECTED')}>
              <div className="stat-header">
                <span className="stat-title">Rejected</span>
                <span className="stat-dot dot-rejected"></span>
              </div>
              <div className="stat-value">{stats.rejected}</div>
              <div className="stat-footer">Declined requests</div>
            </div>
          </section>

          {/* Filter Bar */}
          <div className="admin-filter-bar">
            <div className="filter-tabs-wrapper">
              <div className="filter-tabs">
                <button className={`filter-tab ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => handleTabChange('ALL')}>All ({stats.total})</button>
                <button className={`filter-tab ${activeTab === 'PENDING' ? 'active' : ''}`} onClick={() => handleTabChange('PENDING')}>Pending ({stats.pending})</button>
                <button className={`filter-tab ${activeTab === 'APPROVED' ? 'active' : ''}`} onClick={() => handleTabChange('APPROVED')}>Approved ({stats.approved})</button>
                <button className={`filter-tab ${activeTab === 'REJECTED' ? 'active' : ''}`} onClick={() => handleTabChange('REJECTED')}>Rejected ({stats.rejected})</button>
              </div>
            </div>

            <div className="filter-dropdowns">
              <select
                value={dateFilter}
                onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
                className="admin-select"
              >
                <option value="all">All Dates</option>
                <option value="today">Today's Bookings</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
                className="admin-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Bookings Table / Cards */}
          {activeTab === 'USERS' ? (
            <div className="users-overview-card">
              <h3>Registered Customer Base</h3>
              <p>Tailors2U serves registered customers across doorstep appointments.</p>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Total Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan="4" className="text-center">No customer data found</td></tr>
                    ) : (
                      Array.from(new Set(bookings.map(b => b.email))).map((userEmail, idx) => {
                        const userBooking = bookings.find(b => b.email === userEmail);
                        const count = bookings.filter(b => b.email === userEmail).length;
                        return (
                          <tr key={idx}>
                            <td><strong>{userBooking.name}</strong></td>
                            <td>{userBooking.email}</td>
                            <td>{userBooking.phone}</td>
                            <td><span className="count-pill">{count} bookings</span></td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="admin-table-card">
              {isLoading ? (
                <div className="admin-skeleton-wrapper">
                  <div className="skeleton-line" style={{ height: '40px' }}></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="admin-empty-state">
                  <h3>No bookings found</h3>
                  <p>There are no bookings matching your current filter criteria.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Service</th>
                        <th>Preferred Slot</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className={booking.status === 'PENDING' ? 'row-pending-highlight' : ''}>
                          <td>
                            <div className="cell-customer">
                              <span className="customer-name">{booking.name}</span>
                              <span className="customer-address" title={booking.address}>{booking.address || 'No address provided'}</span>
                            </div>
                          </td>
                          <td>
                            <div className="cell-contact">
                              <span className="contact-email">{booking.email}</span>
                              <span className="contact-phone">{booking.phone}</span>
                            </div>
                          </td>
                          <td>
                            <span className="service-tag">{booking.service}</span>
                          </td>
                          <td>
                            <div className="cell-slot">
                              <span className="slot-date">{formatDate(booking.date)}</span>
                              <span className="slot-time">{booking.time}</span>
                            </div>
                          </td>
                          <td>{renderBadge(booking.status)}</td>
                          <td>
                            <span className="created-time">{formatDateTime(booking.createdAt)}</span>
                          </td>
                          <td className="text-right">
                            <div className="action-btn-group">
                              {booking.status === 'PENDING' && (
                                <>
                                  <button
                                    className="btn-action btn-approve"
                                    onClick={() => handleOpenApproveModal(booking)}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className="btn-action btn-reject"
                                    onClick={() => handleOpenRejectModal(booking)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                className="btn-action btn-details"
                                onClick={() => handleOpenDetailsModal(booking)}
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination controls */}
              {pagination.totalPages > 1 && (
                <div className="pagination-bar">
                  <span>Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total bookings)</span>
                  <div className="pagination-btns">
                    <button
                      className="pagination-btn"
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                    >
                      &laquo; Previous
                    </button>
                    <button
                      className="pagination-btn"
                      disabled={page >= pagination.totalPages}
                      onClick={() => setPage(page + 1)}
                    >
                      Next &raquo;
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* APPROVE MODAL */}
      {isApproveModalOpen && selectedBooking && (
        <div className="admin-modal-overlay" onClick={() => setIsApproveModalOpen(false)}>
          <div className="admin-modal-box animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Approve Booking?</h3>
              <button className="admin-modal-close" onClick={() => setIsApproveModalOpen(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <p>Are you sure you want to approve this appointment request? Upon approval, status will update to <strong>APPROVED</strong> and a confirmation email will be sent immediately to the customer.</p>
              
              <div className="modal-summary-card">
                <div className="summary-row">
                  <span className="summary-label">Customer:</span>
                  <span className="summary-val">{selectedBooking.name} ({selectedBooking.email})</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Service:</span>
                  <span className="summary-val">{selectedBooking.service}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Preferred Date:</span>
                  <span className="summary-val">{formatDate(selectedBooking.date)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Preferred Time:</span>
                  <span className="summary-val">{selectedBooking.time}</span>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-modal-cancel" onClick={() => setIsApproveModalOpen(false)} disabled={isSubmittingAction}>
                Cancel
              </button>
              <button className="btn-modal-approve" onClick={handleConfirmApprove} disabled={isSubmittingAction}>
                {isSubmittingAction ? 'Approving & Sending Email...' : 'Approve Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {isRejectModalOpen && selectedBooking && (
        <div className="admin-modal-overlay" onClick={() => setIsRejectModalOpen(false)}>
          <div className="admin-modal-box animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Reject Booking</h3>
              <button className="admin-modal-close" onClick={() => setIsRejectModalOpen(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <p>Please specify a reason for rejecting <strong>{selectedBooking.name}</strong>'s appointment request for <strong>{selectedBooking.service}</strong>.</p>
              
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="admin-field-label">Reason for Rejection (Required)</label>
                <textarea
                  className="admin-textarea"
                  rows="4"
                  placeholder="e.g. Executive unavailable at requested slot. Please select another time."
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                    if (e.target.value.trim()) setRejectionError('');
                  }}
                ></textarea>
                {rejectionError && <div className="admin-field-error">{rejectionError}</div>}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-modal-cancel" onClick={() => setIsRejectModalOpen(false)} disabled={isSubmittingAction}>
                Cancel
              </button>
              <button className="btn-modal-reject" onClick={handleConfirmReject} disabled={isSubmittingAction}>
                {isSubmittingAction ? 'Rejecting...' : 'Reject Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {isDetailsModalOpen && selectedBooking && (
        <div className="admin-modal-overlay" onClick={() => setIsDetailsModalOpen(false)}>
          <div className="admin-modal-box modal-lg animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Booking Details</h3>
              <button className="admin-modal-close" onClick={() => setIsDetailsModalOpen(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div className="details-grid">
                <div className="details-col">
                  <h4 className="section-subtitle">Customer Information</h4>
                  <p><strong>Name:</strong> {selectedBooking.name}</p>
                  <p><strong>Email:</strong> {selectedBooking.email}</p>
                  <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                  <p><strong>Address:</strong> {selectedBooking.address || 'Not provided'}</p>
                </div>
                <div className="details-col">
                  <h4 className="section-subtitle">Appointment Details</h4>
                  <p><strong>Booking ID:</strong> <code className="code-inline">{selectedBooking.id}</code></p>
                  <p><strong>Service:</strong> {selectedBooking.service}</p>
                  <p><strong>Date:</strong> {formatDate(selectedBooking.date)}</p>
                  <p><strong>Time:</strong> {selectedBooking.time}</p>
                  <p><strong>Status:</strong> {renderBadge(selectedBooking.status)}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={{ marginTop: '1.25rem' }}>
                  <h4 className="section-subtitle">Style & Fit Notes</h4>
                  <div className="notes-box">{selectedBooking.notes}</div>
                </div>
              )}

              {selectedBooking.rejectionReason && (
                <div style={{ marginTop: '1.25rem' }}>
                  <h4 className="section-subtitle" style={{ color: '#f87171' }}>Rejection Reason</h4>
                  <div className="rejection-box">{selectedBooking.rejectionReason}</div>
                </div>
              )}

              <div className="timestamps-footer">
                <span>Submitted: {formatDateTime(selectedBooking.createdAt)}</span>
                {selectedBooking.approvedAt && <span>Approved: {formatDateTime(selectedBooking.approvedAt)}</span>}
                {selectedBooking.rejectedAt && <span>Rejected: {formatDateTime(selectedBooking.rejectedAt)}</span>}
              </div>
            </div>
            <div className="admin-modal-footer">
              {selectedBooking.status === 'PENDING' && (
                <>
                  <button
                    className="btn-modal-approve"
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleOpenApproveModal(selectedBooking);
                    }}
                  >
                    Approve Request
                  </button>
                  <button
                    className="btn-modal-reject"
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleOpenRejectModal(selectedBooking);
                    }}
                  >
                    Reject Request
                  </button>
                </>
              )}
              <button className="btn-modal-cancel" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
