import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/admin-login.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password, remember: rememberMe })
            });

            const data = await response.json();

            if (data.success) {
                // Route cleanly to the dashboard upon successful validation credentials match
                navigate('/admin/dashboard');
            } else {
                setErrorMsg(data.message || 'Invalid administrative access credentials.');
            }
        } catch (error) {
            console.error('Portal connection failure:', error);
            setErrorMsg('Connection failed: Unable to communicate with the authentication link.');
        }
    };

    return (
        <div className="auth-viewport">

            {/* ── RETURN TO HOMEPAGE ACTION BUTTON ── */}
            <Link
                to="/"
                style={{
                    position: 'absolute',
                    top: '32px',
                    left: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#5c5750', // Matches your --mid color token variable layout
                    textDecoration: 'none',
                    fontSize: '11px',
                    fontWeight: '500',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    zIndex: 1000,
                    transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#1a1814'} // Hover shifts to your --black variable
                onMouseLeave={(e) => e.target.style.color = '#5c5750'}
            >
                ← Back to Website
            </Link>

            {/* MAIN AUTHENTICATION PORTAL BOX CARD */}
            <div className="auth-portal-container">

                {/* BRAND GRAPHIC IDENTITY LOGO */}
                <div className="auth-brand-group">
                    <h1 className="auth-logo-script">Casa Miranda</h1>
                    <div className="auth-logo-sub">MANAGEMENT PORTAL</div>
                </div>

                <div className="auth-headline-block">
                    <h2>Welcome Back</h2>
                    <p>Please enter your authorized admin space credentials.</p>
                </div>

                {/* VISUAL ERROR BANNER */}
                <div
                    className="auth-alert-banner"
                    style={{ display: errorMsg ? 'block' : 'none' }}
                >
                    {errorMsg}
                </div>

                {/* FORM CONTROLS EXECUTION SYSTEM */}
                <form onSubmit={handleLoginSubmit}>
                    <div className="auth-input-field-item">
                        <label htmlFor="admin-email">Email Address</label>
                        <input
                            type="email"
                            id="admin-email"
                            placeholder="admin@casamiranda.ph"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-input-field-item">
                        <div className="auth-label-split-row">
                            <label htmlFor="admin-password">Password</label>
                            <a href="#forgot" className="auth-utility-link">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            id="admin-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-checkbox-row-wrapper">
                        <label className="auth-custom-checkbox-container">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="auth-custom-checkbox-box"></span>
                            <span className="auth-checkbox-label-text">Remember this workstation session</span>
                        </label>
                    </div>

                    <button type="submit" className="btn-portal-submit">
                        LOG IN TO PORTAL <span>→</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;