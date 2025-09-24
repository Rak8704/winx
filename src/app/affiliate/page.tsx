"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Copy,
  Award
} from 'lucide-react';

interface AffiliateData {
  isAffiliate: boolean;
  affiliate?: {
    id: string;
    affiliateCode: string;
    isActive: boolean;
    tier: string;
    totalEarnings: number;
    pendingEarnings: number;
    totalReferrals: number;
    activeReferrals: number;
    commissionRate: number;
    createdAt: string;
  };
  message?: string;
}

interface AnalyticsData {
  overview: {
    totalClicks: number;
    totalReferrals: number;
    activeReferrals: number;
    conversionRate: number;
    totalEarnings: number;
    pendingEarnings: number;
    thisMonthEarnings: number;
  };
  chartData: {
    clicks: Array<{ date: string; clicks: number }>;
    earnings: Array<{ date: string; amount: number }>;
  };
  topReferrals: Array<{
    id: string;
    name: string;
    phone: string;
    totalDeposits: number;
    totalCommissions: number;
    joinDate: string;
    status: string;
  }>;
}

const AffiliatePage = () => {
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchAffiliateData();
    fetchAnalyticsData();
  }, []);

  const fetchAffiliateData = async () => {
    try {
      const response = await fetch('/api/affiliate');
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch affiliate data failed:', errorText);
        throw new Error(`Fetch affiliate data failed with status ${response.status}: ${errorText}`);
      }
      
      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }
      
      const data = JSON.parse(text);
      setAffiliateData(data);
    } catch (error) {
      console.error('Error fetching affiliate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/affiliate/analytics');
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch analytics data failed:', errorText);
        throw new Error(`Fetch analytics data failed with status ${response.status}: ${errorText}`);
      }
      
      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }
      
      const data = JSON.parse(text);
      if (data && data.success) {
        setAnalyticsData(data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const handleRegisterAsAffiliate = async () => {
    setRegistering(true);
    try {
      const response = await fetch('/api/affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Register affiliate failed:', errorText);
        throw new Error(`Register affiliate failed with status ${response.status}: ${errorText}`);
      }
      
      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }
      
      const data = JSON.parse(text);
      
      if (data && data.success) {
        await fetchAffiliateData();
      } else {
        alert(data.message || 'Failed to register as affiliate');
      }
    } catch (error) {
      console.error('Error registering as affiliate:', error);
      alert('Failed to register as affiliate');
    } finally {
      setRegistering(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'BRONZE': return 'bg-amber-600';
      case 'SILVER': return 'bg-gray-400';
      case 'GOLD': return 'bg-yellow-500';
      case 'PLATINUM': return 'bg-purple-600';
      case 'DIAMOND': return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading affiliate dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!affiliateData?.isAffiliate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-4">
                Join Our Affiliate Program
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Earn commissions by referring new players to our platform
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-700 rounded-lg">
                  <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">High Commissions</h3>
                  <p className="text-gray-300">Earn up to 5% commission on every referral</p>
                </div>
                <div className="text-center p-6 bg-gray-700 rounded-lg">
                  <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Real-time Tracking</h3>
                  <p className="text-gray-300">Monitor your earnings and referrals in real-time</p>
                </div>
                <div className="text-center p-6 bg-gray-700 rounded-lg">
                  <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Tier System</h3>
                  <p className="text-gray-300">Unlock higher commission rates as you grow</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleRegisterAsAffiliate}
                  disabled={registering}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                >
                  {registering ? 'Registering...' : 'Become an Affiliate'}
                </Button>
                <p className="text-gray-400 mt-4">
                  {affiliateData?.message || 'Start earning today by joining our affiliate program'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const affiliate = affiliateData.affiliate!;
  const analytics = analyticsData?.overview;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Affiliate Dashboard</h1>
            <p className="text-gray-300">Welcome back! Here's your affiliate performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={`${getTierColor(affiliate.tier)} text-white px-3 py-1`}>
              {affiliate.tier} TIER
            </Badge>
            <div className="text-right">
              <p className="text-sm text-gray-400">Affiliate Code</p>
              <div className="flex items-center space-x-2">
                <code className="text-white font-mono bg-gray-800 px-2 py-1 rounded">
                  {affiliate.affiliateCode}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(affiliate.affiliateCode)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-500">
                    ${analytics?.totalEarnings?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Referrals</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {analytics?.totalReferrals || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Clicks</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {analytics?.totalClicks || 0}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {analytics?.conversionRate?.toFixed(1) || '0.0'}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="referrals" className="text-gray-300 data-[state=active]:text-white">
              Referrals
            </TabsTrigger>
            <TabsTrigger value="links" className="text-gray-300 data-[state=active]:text-white">
              Links
            </TabsTrigger>
            <TabsTrigger value="payouts" className="text-gray-300 data-[state=active]:text-white">
              Payouts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Month Earnings</span>
                      <span className="text-green-500 font-semibold">
                        ${analytics?.thisMonthEarnings?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Pending Earnings</span>
                      <span className="text-yellow-500 font-semibold">
                        ${analytics?.pendingEarnings?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Referrals</span>
                      <span className="text-blue-500 font-semibold">
                        {analytics?.activeReferrals || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Commission Rate</span>
                      <span className="text-purple-500 font-semibold">
                        {(affiliate.commissionRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData?.topReferrals?.slice(0, 5).map((referral) => (
                      <div key={referral.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{referral.name}</p>
                          <p className="text-gray-400 text-sm">{referral.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-500 font-semibold">
                            ${referral.totalCommissions.toFixed(2)}
                          </p>
                          <Badge 
                            variant={referral.status === 'ACTIVE' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {referral.status}
                          </Badge>
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-400 text-center py-4">No referrals yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Your Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Referral management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Affiliate Links</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Link generation coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Payout History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Payout management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AffiliatePage;