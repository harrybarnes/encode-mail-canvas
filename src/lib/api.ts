import { createSupabaseClient } from '@/lib/supabaseClient';

const supabase = createSupabaseClient();

export const api = {
  // Campaigns
  getCampaigns: () => supabase.functions.invoke('campaign-manager', { method: 'GET' }),
  createCampaign: (data: any) => supabase.functions.invoke('campaign-manager', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  
  // Gmail
  startGmailAuth: () => supabase.functions.invoke('gmail-auth-start'),
  
  // Analytics
  getAnalytics: (campaignId: string) => supabase.functions.invoke('get-campaign-analytics', {
    body: JSON.stringify({ campaign_id: campaignId })
  }),
  
  // Leads
  uploadLeads: (file: any) => supabase.functions.invoke('leads-manager', {
    body: file
  }),
  
  // Emails
  generateDraft: (prompt: any) => supabase.functions.invoke('generate-email-draft', {
    body: JSON.stringify({ prompt })
  }),
  sendEmail: (data: any) => supabase.functions.invoke('send-email', {
    body: JSON.stringify(data)
  })
} 