import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const AccountContext = createContext();

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};

export const AccountProvider = ({ children }) => {
    const [userProfileComplete, setUserProfileComplete] = useState(false);
    const [companyProfileComplete, setCompanyProfileComplete] = useState(false);
    const [subscriptionComplete, setSubscriptionComplete] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkUserProfile = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            const userData = userDoc.data();
            return userDoc.exists() && 
                    userData.phone && 
                    userData.email && 
                    userData.firstName &&
                    userData.lastName;
        } catch (error) {
            console.error("Error checking user profile:", error);
            return false;
        }
    };

    const checkCompanyProfile = async (uid) => {
    try {
        const clientDoc = await getDoc(doc(db, "clients", uid));
        const clientData = clientDoc.data();
        return clientDoc.exists() && 
                clientData.name && 
                clientData.street_address && 
                clientData.operational_hours;
        } catch (error) {
        console.error("Error checking company profile:", error);
        return false;
        }
    };

    const checkSubscription = async (uid) => {
    try {
        const clientDoc = await getDoc(doc(db, "clients", uid));
        const clientData = clientDoc.data();
        return clientDoc.exists() && clientData.subscription_status === 'active';
        } catch (error) {
        console.error("Error checking subscription:", error);
        return false;
        }
    };

    useEffect(() => {
        const validateAccount = async () => {
        setLoading(true);
        const user = auth.currentUser;
        
        if (user) {
            const [userComplete, companyComplete, subComplete] = await Promise.all([
            checkUserProfile(user.uid),
            checkCompanyProfile(user.uid),
            checkSubscription(user.uid)
            ]);

            setUserProfileComplete(userComplete);
            setCompanyProfileComplete(companyComplete);
            setSubscriptionComplete(subComplete);
        }
        
        setLoading(false);
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            validateAccount();
        } else {
            setUserProfileComplete(false);
            setCompanyProfileComplete(false);
            setSubscriptionComplete(false);
            setLoading(false);
        }
        });

        return () => unsubscribe();
    }, []);

    const value = {
        userProfileComplete,
        companyProfileComplete,
        subscriptionComplete,
        loading,
        isSetupComplete: userProfileComplete && companyProfileComplete && subscriptionComplete,
        refreshStatus: async () => {
        const user = auth.currentUser;
        if (user) {
            const [userComplete, companyComplete, subComplete] = await Promise.all([
            checkUserProfile(user.uid),
            checkCompanyProfile(user.uid),
            checkSubscription(user.uid)
            ]);

            setUserProfileComplete(userComplete);
            setCompanyProfileComplete(companyComplete);
            setSubscriptionComplete(subComplete);
        }
        }
    };

    return (
        <AccountContext.Provider value={value}>
        {children}
        </AccountContext.Provider>
    );
};

export default AccountContext;
