
import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Check, Code2,
  Command, Film, Layers3, Menu, Plus, Send, ShieldCheck, Sparkles, X,
  LockKeyhole, LogOut, Trash2, Pencil, Upload, ExternalLink, Mail,
  Instagram, Globe, MoveUpRight
} from 'lucide-react';
import './style.css';

const t1 = { url: '/reel-thumb-1.png' };
const t2 = { url: '/reel-thumb-2.png' };
const t3 = { url: '/reel-thumb-3.png' };

import { SplineScene } from './components/ui/splite.jsx';
import { Spotlight } from './components/ui/spotlight.jsx';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const reels = [
  {
    title: 'Abu Zaman',
    thumb: t1.url,
    url: 'https://www.instagram.com/reel/De60UFyPHN6/',
    website: '',
    category: 'VIDEO EDITING',
    label: 'VISUAL STORYTELLING'
  },
  {
    title: 'Xpart Photography',
    thumb: t2.url,
    url: 'https://www.instagram.com/reel/De9-gSbIIVX/',
    website: 'https://xpart-photography.lovable.app',
    category: 'VIDEO EDITING',
    label: 'BRAND FILM'
  },
  {
    title: 'Honey Photography',
    thumb: t3.url,
    url: 'https://www.instagram.com/reel/De9YC4HIfGp/',
    website: 'https://honey-studio-portfolio.netlify.app/',
    category: 'BEHIND THE SCENES',
    label: 'BEHIND THE SCENES'
  }
];

const initialProjects = [
  {
    id: 'local-1',
    title: 'Portfolio Experience',
    category: 'WEB DEVELOPMENT',
    description: 'A polished portfolio concept focused on visual storytelling, clear hierarchy and immersive presentation.',
    link: '',
    cover: '',
    local: true
  },
  {
    id: 'local-2',
    title: 'Studio Website',
    category: 'WEB DEVELOPMENT',
    description: 'A creative studio website built to present a brand and its work with a distinctive digital identity.',
    link: '',
    cover: '',
    local: true
  },
  {
    id: 'local-3',
    title: 'Creative Studio Portfolio',
    category: 'WEB DEVELOPMENT',
    description: 'A portfolio and studio website concept developed with an AI-assisted workflow.',
    link: '',
    cover: '',
    local: true
  }
];

const name = 'Mᴏʜᴀᴍᴍᴀᴅ RᴇʜXɴɴ';

function GlassButton({
  children,
  href,
  onClick,
  icon: Icon = ArrowRight,
  type = 'button',
  className = ''
}) {
  const inner = (
    <>
      {children}
      <span className="button-icon"><Icon size={17} /></span>
    </>
