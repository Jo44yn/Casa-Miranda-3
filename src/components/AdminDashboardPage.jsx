import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/admin-dashboard.css';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, bookings, guests, inquiries, payments, analytics
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    // ── 1. DYNAMIC CALENDAR ALIGNMENT ──
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    // Form states
    const [formGuestName, setFormGuestName] = useState('');
    const [formGuestEmail, setFormGuestEmail] = useState('');
    const [formStart, setFormStart] = useState('');
    const [formEnd, setFormEnd] = useState('');
    const [formPrice, setFormPrice] = useState(0);

    // Filter state for bookings tab
    const [bookingFilter, setBookingFilter] = useState('ALL');

    // ── LIVE BACKEND DATABASE DRIVEN STATES ──
    const [metrics, setMetrics] = useState({ totalBookings: 0, alos: '0 nights', cancellationRate: '0%', revenue: '0.00' });
    const [bookingsList, setBookingsList] = useState([]);
    const [guestsList, setGuestsList] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    // ── LIVE BACKEND DRIVEN INQUIRIES STATE ──
    const [inquiriesList, setInquiriesList] = useState([]);

    // Pulls data straight from your Laravel API Overview Endpoint
    const fetchDashboardOverview = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/overview');
            if (!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.success) {
                setMetrics(data.metrics ?? { totalBookings: 0, alos: '0 nights', cancellationRate: '0%', revenue: '0.00' });
                setBookingsList(data.bookings ?? []);
                setGuestsList(data.guests ?? []);
            }
        } catch (error) {
            console.error("Failed to fetch backend dashboard state engine metrics:", error);
        } finally {
            setLoading(false);
        }
    };

    // ── CONNECTED BACKEND FETCH: GET ALL INQUIRIES FROM CONTACT PAGE DATA ──
    const fetchInquiries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/inquiries');
            if (!response.ok) {
                throw new Error(`Inquiries fetching error: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.success) {
                setInquiriesList(data.inquiries ?? []);
            }
        } catch (error) {
            console.error("Failed to fetch live message inquiries from database ledger:", error);
        }
    };

    // Function to send the status update straight to your database context
    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/bookings/${bookingId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message);
                fetchDashboardOverview();
            } else {
                alert("Failed to update status: " + data.message);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Server connection processing failure.");
        }
    };

    // ── CONNECTED BACKEND PATCH: UPDATE SPECIAL INQUIRY LOG CONDITION ──
    const handleInquiryStatusChange = async (inquiryId, nextStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/inquiries/${inquiryId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status: nextStatus })
            });

            const data = await response.json();
            if (data.success) {
                alert(`Inquiry successfully marked as ${nextStatus}!`);
                fetchInquiries();
            } else {
                alert("Failed to update inquiry profile row: " + data.message);
            }
        } catch (error) {
            console.error("Error mutating backend inquiry state mapping:", error);
            alert("API context processing failure.");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDashboardOverview();
        fetchInquiries();
    }, []);

    const handleSignOut = () => {
        alert("Signing out from admin control systems...");
        navigate('/admin/login');
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        alert(`Reservation Created successfully for ${formGuestName}!`);
        setIsBookingModalOpen(false);
        setFormGuestName('');
        setFormGuestEmail('');
        setFormStart('');
        setFormEnd('');
        setFormPrice(0);
    };

    const filteredBookings = bookingsList?.filter(b => {
        if (bookingFilter === 'ALL') return true;
        return b?.status?.toUpperCase() === bookingFilter.toUpperCase();
    }) ?? [];

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOffset = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const generateCalendarCells = () => {
        const totalDays = getDaysInMonth(currentMonth);
        const offset = getFirstDayOffset(currentMonth);
        const cells = [];

        for (let i = 0; i < offset; i++) {
            cells.push({ type: 'empty', id: `empty-${i}` });
        }

        for (let day = 1; day <= totalDays; day++) {
            const cellDateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayBooking = bookingsList?.find(b => {
                const checkIn = b.check_in;
                const checkOut = b.check_out;
                return cellDateStr >= checkIn && cellDateStr <= checkOut;
            });

            let statusClass = '';
            if (dayBooking) {
                const status = dayBooking.status?.toUpperCase();
                if (status === 'CONFIRMED') statusClass = 'bg-blue';
                else if (status === 'COMPLETE') statusClass = 'bg-green';
                else if (status === 'CANCELLED') statusClass = 'bg-pink';
            }

            cells.push({
                type: 'day',
                dayNum: day,
                dateString: cellDateStr,
                statusClass: statusClass,
                bookingData: dayBooking ?? null
            });
        }

        return cells;
    };

    if (loading) {
        return <div style={{ padding: '48px', fontFamily: 'DM Sans', color: 'var(--mid)' }}>Syncing live database records...</div>;
    }

    return (
        <div className="layout c-application">

            {/* Sidebar Navigation */}
            <aside className="sidebar c-sidebar">
                <div className="c-sidebar__brand">
                    <span className="sidebar-brand-sub">Admin Management</span>
                    <span className="sidebar-brand-title">Casa Miranda</span>
                </div>

                <nav className="nav c-sidebar__nav">
                    <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                        </svg>
                        Dashboard
                    </div>
                    <div className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Bookings
                    </div>
                    <div className={`nav-item ${activeTab === 'guests' ? 'active' : ''}`} onClick={() => setActiveTab('guests')}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7" />
                        </svg>
                        Guests
                    </div>

                    <div className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Inquiries
                    </div>

                    <div className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                            <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        Payments
                    </div>
                    <div className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        Analytics
                    </div>

                    <div className="nav-item text-danger" style={{ marginTop: 'auto' }} onClick={handleSignOut}>
                        ✕ Sign Out
                    </div>
                </nav>
            </aside>

            {/* Workspace Space Container Panels */}
            <main className="main c-view-container">

                {/* VIEW COMPONENT: Dashboard Panel */}
                {activeTab === 'dashboard' && (
                    <div className="tab-view active-view c-view-pane">
                        <header className="topbar c-view-header">
                            <div className="topbar-left">
                                <div className="overview-label">Overview</div>
                                <h1>Dashboard</h1>
                            </div>
                            <div className="topbar-actions c-view-header__actions">
                                <button className="btn btn-outline">DOWNLOAD REPORT</button>
                                <button className="btn btn-solid" onClick={() => setIsBookingModalOpen(true)}>
                                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>New Booking
                                </button>
                            </div>
                        </header>

                        <section className="stats-row c-card-grid">
                            <div className="stat-card">
                                <div className="stat-label">Month's Bookings</div>
                                <div className="stat-value">{metrics?.totalBookings ?? 0}</div>
                                <div className="stat-sub">Live dynamic count</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Avg Length of Stay</div>
                                <div className="stat-value">{metrics?.alos ?? '0 nights'}</div>
                                <div className="stat-sub">calculated state nights</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Cancellation Rate</div>
                                <div className="stat-value">{metrics?.cancellationRate ?? '0%'}</div>
                                <div className="stat-sub">cancellation metric ratio</div>
                            </div>
                            <div className="stat-card dark">
                                <div className="stat-trevpar">TRevPAR</div>
                                <div className="stat-value"><span className="peso">₱</span>{metrics?.revenue ?? '0.00'}</div>
                                <div className="stat-sub">net dynamic aggregate</div>
                            </div>
                        </section>

                        <div className="content-row c-dashboard-workspace">
                            <article className="calendar-section c-calendar-component">
                                <div className="admin-section-header">
                                    <div className="admin-section-title">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
                                    <div className="nav-arrows">
                                        <button className="arrow-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>&lsaquo;</button>
                                        <button className="arrow-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>&rsaquo;</button>
                                    </div>
                                </div>
                                <div className="calendar">
                                    <div className="cal-grid">
                                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                            <div key={day} className="cal-header-cell">{day}</div>
                                        ))}

                                        {generateCalendarCells().map((cell, idx) => (
                                            cell.type === 'empty' ? (
                                                <div key={cell.id} className="cal-date-box cal-cell empty-cell"></div>
                                            ) : (
                                                <div
                                                    key={cell.dateString}
                                                    className={`cal-date-box cal-cell ${cell.statusClass}`}
                                                    title={cell.bookingData ? `${cell.bookingData.guest_name} (${cell.bookingData.status})` : ''}
                                                    style={{ cursor: cell.bookingData ? 'pointer' : 'default' }}
                                                    onClick={() => {
                                                        if (cell.bookingData) {
                                                            setSelectedInvoice(cell.bookingData);
                                                            setIsInvoiceModalOpen(true);
                                                        }
                                                    }}
                                                >
                                                    <span className="cell-num">{cell.dayNum}</span>
                                                    {cell.bookingData && (
                                                        <div className="calendar-mini-label" style={{ fontSize: '9px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '4px', maxWidth: '100%', padding: '0 2px' }}>
                                                            {cell.bookingData.guest_name.split(' ')[0]}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </article>

                            <aside className="right-panel c-control-sidebar">
                                <div className="c-control-sidebar__group">
                                    <div className="panel-label">Quick Actions</div>
                                    <div className="quick-actions-group">
                                        <button className="quick-action" onClick={() => alert("Date structural lock triggered.")}>Block Dates</button>
                                        <button className="quick-action" onClick={() => alert("Select an active calendar block or route to ledger tables to focus invoices.")}>Generate Invoice</button>
                                    </div>
                                </div>
                                <div className="c-control-sidebar__group">
                                    <div className="panel-label">Recent Reservations</div>
                                    <div id="recent-reservations-pane">
                                        {bookingsList?.slice(0, 3).map(b => (
                                            <div className="reservation-card" style={{ marginBottom: '10px' }} key={b.id}>
                                                <div className="res-name">{b.guest_name}</div>
                                                <div className="res-date">{b.check_in} - {b.check_out}</div>
                                                <span className={`res-tag ${b.status === 'Cancelled' ? 'text-danger' : ''}`}>{b.status}</span>
                                            </div>
                                        )) ?? <div className="sub-text-light">No recent entries.</div>}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                )}

                {/* VIEW COMPONENT: Bookings Panel */}
                {activeTab === 'bookings' && (
                    <div className="tab-view active-view c-view-pane">
                        <header className="topbar c-view-header">
                            <div className="topbar-left">
                                <h1>Bookings</h1>
                                <div className="overview-label" style={{ textTransform: 'none', marginTop: '4px' }}>Manage and review all resort reservations.</div>
                            </div>
                            <div className="topbar-actions-row c-view-header__toolbar">
                                <div className="search-wrapper c-search-box">
                                    <input type="text" className="search-input" placeholder="Search by name or reference ID..." />
                                </div>
                                <button className="btn btn-solid" onClick={() => setIsBookingModalOpen(true)}>+ New Booking</button>
                            </div>
                        </header>

                        <div className="table-filter-pills-row-bar">
                            {['ALL', 'CONFIRMED', 'COMPLETE', 'CANCELLED'].map(filter => (
                                <button
                                    key={filter}
                                    className={`filter-pill-btn ${bookingFilter === filter ? 'active' : ''}`}
                                    onClick={() => setBookingFilter(filter)}
                                >
                                    {filter === 'ALL' ? 'All Bookings' : filter}
                                </button>
                            ))}
                        </div>

                        <table className="ledger-table c-data-ledger">
                            <thead>
                                <tr>
                                    <th>Guest Reference</th>
                                    <th>Stay Timeline</th>
                                    <th>Status Condition</th>
                                    <th>Operational Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr className="booking-row-entry" key={booking.id}>
                                        <td className="primary-text-bold">
                                            {booking.guest_name}
                                            <div className="sub-text-light">{booking.reference}</div>
                                        </td>
                                        <td className="primary-text-regular">
                                            {booking.check_in} – {booking.check_out}
                                            <div className="sub-text-light">{booking.nights} Nights, {booking.type}</div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${booking.status ? booking.status.toLowerCase() : 'unknown'}`}>{booking.status}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                <button
                                                    className="btn-action-text"
                                                    onClick={() => {
                                                        setSelectedInvoice(booking);
                                                        setIsInvoiceModalOpen(true);
                                                    }}
                                                >
                                                    View Statement
                                                </button>

                                                {booking.status === 'Confirmed' && (
                                                    <>
                                                        <button
                                                            className="btn-action-text"
                                                            style={{ color: '#2e7d32', fontWeight: '600' }}
                                                            onClick={() => handleStatusUpdate(booking.id, 'Complete')}
                                                        >
                                                            ✓ Complete
                                                        </button>
                                                        <button
                                                            className="btn-action-text"
                                                            style={{ color: '#d32f2f', fontWeight: '600' }}
                                                            onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                                                        >
                                                            ✕ Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* VIEW COMPONENT: Guests Directory Panel */}
                {activeTab === 'guests' && (
                    <div className="tab-view active-view c-view-pane">
                        <header className="topbar c-view-header">
                            <div className="topbar-left">
                                <h1>Guest Directory</h1>
                            </div>
                        </header>
                        <table className="ledger-table transparent-table c-data-ledger m-variant-transparent">
                            <thead>
                                <tr>
                                    <th>Guest Profile</th>
                                    <th>Contact Information</th>
                                    <th>Stay History</th>
                                    <th>Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guestsList?.map((guest) => (
                                    <tr key={guest.id}>
                                        <td className="primary-text-bold">{guest.prefix} {guest.first_name} {guest.last_name}</td>
                                        <td className="primary-text-regular">
                                            {guest.email}
                                            <div className="sub-text-light">{guest.country_code} {guest.phone}</div>
                                        </td>
                                        <td className="history-metric"><span>{guest.bookings_count ?? 0}</span> stays</td>
                                        <td className="sub-text-light">{guest.guest_type} configuration logs.</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* WORKSPACE VIEW COMPONENT: SPECIAL INQUIRIES DIRECTORY PANEL */}
                {activeTab === 'inquiries' && (
                    <div className="tab-view active-view c-view-pane">
                        <header className="topbar c-view-header">
                            <div className="topbar-left">
                                <h1>Concierge Inquiries</h1>
                                <div className="overview-label" style={{ textTransform: 'none', marginTop: '4px' }}>Review short property overview and special questions from the Contact form.</div>
                            </div>
                        </header>
                        <table className="ledger-table c-data-ledger">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>Date Received</th>
                                    <th style={{ width: '20%' }}>Sender Profile</th>
                                    <th style={{ width: '45%' }}>Message Inquiry</th>
                                    <th style={{ width: '10%' }}>Status</th>
                                    <th style={{ width: '10%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiriesList.map((inq) => (
                                    <tr key={inq.id}>
                                        <td className="primary-text-regular">{inq.created_at ? new Date(inq.created_at).toLocaleDateString() : inq.date}</td>
                                        <td className="primary-text-bold">
                                            {inq.name}
                                            <div className="sub-text-light">{inq.email}</div>
                                        </td>
                                        <td className="primary-text-regular" style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.4' }}>
                                            "{inq.message}"
                                        </td>
                                        <td>
                                            <span className={`badge ${inq.status?.toUpperCase() === 'PENDING' ? 'badge-cancelled' : 'badge-complete'}`} style={{ textTransform: 'uppercase' }}>
                                                {inq.status}
                                            </span>
                                        </td>
                                        <td>
                                            {inq.status?.toUpperCase() === 'PENDING' ? (
                                                <button
                                                    className="btn-action-text"
                                                    style={{ color: '#2e7d32', fontWeight: '600' }}
                                                    onClick={() => handleInquiryStatusChange(inq.id, 'Reviewed')}
                                                >
                                                    Mark Reviewed
                                                </button>
                                            ) : (
                                                <span className="sub-text-light" style={{ fontStyle: 'italic' }}>Archived</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {inquiriesList.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="sub-text-light" style={{ textAlign: 'center', padding: '2rem' }}>No active inquiries received from the contact forms.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* VIEW COMPONENT: Payments Accounting Ledger */}
                {activeTab === 'payments' && (
                    <div className="tab-view active-view c-view-pane">
                        <header className="topbar c-view-header">
                            <div className="topbar-left">
                                <div className="overview-label">Payment Management</div>
                                <h1>Accounting Ledger</h1>
                            </div>
                        </header>
                        <div className="section-divider-label">All Transactions</div>
                        <div className="c-ledger-list">
                            {bookingsList?.filter(b => b?.status !== 'Cancelled').map(b => (
                                <div className="ledger-row-item" key={b.id}>
                                    <div>
                                        <span className="ledger-id">TXN-{100000 + b.id}</span>
                                        <div className="ledger-title-name">{b.guest_name}</div>
                                        <div className="ledger-subtitle-date">Processed for entry schedule {b.check_in}</div>
                                    </div>
                                    <div className="ledger-center-amount">₱{parseFloat(b.grand_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                    <div className="ledger-right-actions">
                                        <button className="btn-action-text" onClick={() => {
                                            setSelectedInvoice(b);
                                            setIsInvoiceModalOpen(true);
                                        }}>Invoice Statement</button>
                                    </div>
                                </div>
                            )) ?? <div className="sub-text-light" style={{ padding: '16px' }}>No transactions logged.</div>}
                        </div>
                    </div>
                )}

                {/* VIEW COMPONENT: Performance Analytics */}
                {activeTab === 'analytics' && (
                    <div className="tab-view active-view c-view-pane">
                        <header className="topbar c-view-header">
                            <div className="topbar-left">
                                <div className="overview-label">Reporting Period</div>
                                <h1>Performance Analytics</h1>
                            </div>
                        </header>

                        <section className="stats-row grid-4 c-card-grid m-columns-4">
                            <div className="card-outline">
                                <div className="stat-label">RevPAR</div>
                                <div className="stat-value">₱6,000</div>
                                <div className="stat-sub">+12% vs last month</div>
                            </div>
                            <div className="card-outline">
                                <div className="stat-label">ALOS</div>
                                <div className="stat-value">{metrics?.alos?.replace(' nights', '') ?? '0'}</div>
                                <div className="stat-sub">vs last month</div>
                            </div>
                            <div className="card-outline">
                                <div className="stat-label">New Bookings</div>
                                <div className="stat-value">{metrics?.totalBookings ?? 0}</div>
                                <div className="stat-sub">vs last month</div>
                            </div>
                            <div className="card-outline">
                                <div className="stat-label">TRevPAR</div>
                                <div className="stat-value"><span className="peso">₱</span>{metrics?.revenue?.split('.')[0] ?? '0'}</div>
                                <div className="stat-sub">vs last month</div>
                            </div>
                        </section>

                        <div className="analytics-layout-grid c-analytics-workspace">
                            <article className="chart-main-card c-chart-card">
                                <div className="chart-header">
                                    <span className="chart-title">Revenue Overview</span>
                                    <span className="dots-menu">•••</span>
                                </div>
                                <div className="chart-axis-y">
                                    <span>₱200k</span><span>₱150k</span><span>₱100k</span><span>₱50k</span><span>₱0</span>
                                </div>
                                <div className="svg-chart-container">
                                    <svg viewBox="0 0 500 200" className="analytics-svg-line" style={{ overflow: 'visible' }}>
                                        <path d="M 0 150 Q 125 100 250 80 T 500 30" fill="none" stroke="#1a1814" strokeWidth="3.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="chart-axis-x">
                                    <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                                </div>
                            </article>

                            <article className="peak-days-card c-ranker-card">
                                <h3>Peak Booking Days</h3>
                                <ul className="days-list">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <li key={day} className={day === 'Sat' ? 'active-peak' : ''}><span>{day}</span></li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </div>
                )}
            </main>

            {/* ── MODALS overlay ── */}
            {isBookingModalOpen && (
                <div className="custom-modal-overlay" style={{ display: 'flex' }}>
                    <div className="custom-modal-card">
                        <h2>Create New Reservation</h2>
                        <form onSubmit={handleBookingSubmit}>
                            <div className="form-input-item">
                                <label>Guest Name</label>
                                <input type="text" required placeholder="e.g., Acosta Frances" value={formGuestName} onChange={(e) => setFormGuestName(e.target.value)} />
                            </div>
                            <div className="form-input-item">
                                <label>Email Address</label>
                                <input type="email" required placeholder="name@email.com" value={formGuestEmail} onChange={(e) => setFormGuestEmail(e.target.value)} />
                            </div>
                            <div className="form-input-row">
                                <div className="form-input-item">
                                    <label>Start Date</label>
                                    <input type="date" required value={formStart} onChange={(e) => setFormStart(e.target.value)} />
                                </div>
                                <div className="form-input-item">
                                    <label>End Date</label>
                                    <input type="date" required value={formEnd} onChange={(e) => setFormEnd(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-input-item">
                                <label>Total Amount (PHP)</label>
                                <input type="number" min="0" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} />
                            </div>
                            <div className="form-modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setIsBookingModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-solid">Save Entry</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isInvoiceModalOpen && selectedInvoice && (
                <div className="custom-modal-overlay" style={{ display: 'flex' }}>
                    <div className="custom-modal-card invoice-card-layout">
                        <div className="invoice-brand-row">
                            <div>
                                <div className="logo" style={{ fontSize: '26px' }}>Casa Miranda</div>
                                <div className="logo-sub" style={{ marginBottom: 0 }}>Resort Statement</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '11px', color: 'var(--light)', textTransform: 'uppercase' }}>Invoice Reference</div>
                                <div style={{ fontSize: '14px', fontWeight: '500', marginTop: '2px' }}>{selectedInvoice.reference}</div>
                            </div>
                        </div>
                        <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '20px 0' }} />
                        <div className="invoice-details-grid">
                            <div>
                                <h4>Billed To:</h4>
                                <p style={{ fontWeight: '500', fontSize: '13px', marginTop: '4px' }}>{selectedInvoice.guest_name}</p>
                                <p style={{ fontSize: '12px', color: 'var(--mid)' }}>{selectedInvoice.email}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <h4>Statement Date:</h4>
                                <p style={{ fontSize: '12px', color: 'var(--mid)', marginTop: '4px' }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                <div style={{ marginTop: '10px' }}><span className={`badge badge-${selectedInvoice.status ? selectedInvoice.status.toLowerCase() : 'unknown'}`}>{selectedInvoice.status}</span></div>
                            </div>
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <h4>Reservation Timeline:</h4>
                            <p style={{ fontSize: '13px', color: 'var(--black)' }}>{selectedInvoice.check_in} – {selectedInvoice.check_out} ({selectedInvoice.nights} Nights)</p>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--black)' }}>
                                    <th style={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '8px', color: 'var(--light)' }}>Description</th>
                                    <th style={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '8px', color: 'var(--light)', textAlign: 'center' }}>Qty</th>
                                    <th style={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '8px', color: 'var(--light)', textAlign: 'right' }}>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '10px 0', fontSize: '12px' }}>Villa Accommodation Base Charge ({selectedInvoice.type})</td>
                                    <td style={{ textAlign: 'center', fontSize: '12px' }}>{selectedInvoice.type === 'daytime' ? 1 : selectedInvoice.nights}</td>
                                    <td style={{ textAlign: 'right', fontSize: '12px' }}>₱6,000.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="invoice-summary-block">
                            <div className="inv-summary-line"><span>Subtotal Room Charge</span><span>₱{(selectedInvoice.grand_total * 0.88).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="inv-summary-line"><span>Value Added Tax (12% VAT)</span><span>₱{(selectedInvoice.grand_total * 0.12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="inv-summary-line"><span>Resort Service Charge (5%)</span><span>₱0.00</span></div>
                            <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '10px 0' }} />
                            <div className="inv-summary-line grand-total"><span>Total Account Balance Due</span><span>₱{parseFloat(selectedInvoice.grand_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        </div>
                        <div className="form-modal-actions" style={{ marginTop: '32px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setIsInvoiceModalOpen(false)}>Close</button>
                            <button type="button" className="btn btn-solid" onClick={() => window.print()}>🖨 Print Invoice</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboardPage;