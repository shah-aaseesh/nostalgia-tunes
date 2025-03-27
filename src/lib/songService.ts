import { supabase } from './supabase';
import type { Song } from '@/types';

export const songService = {
  async uploadFile(file: File, bucket: 'audio' | 'images'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async getSongs(): Promise<Song[]> {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      audioUrl: song.audio_url,
      imageUrl: song.image_url,
      duration: song.duration
    }));
  },

  async addSong(song: Omit<Song, 'id'>): Promise<Song> {
    const { data, error } = await supabase
      .from('songs')
      .insert([{
        title: song.title,
        artist: song.artist,
        audio_url: song.audioUrl,
        image_url: song.imageUrl,
        duration: song.duration
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      artist: data.artist,
      audioUrl: data.audio_url,
      imageUrl: data.image_url,
      duration: data.duration
    };
  },

  async deleteSong(id: string): Promise<void> {
    const { error } = await supabase
      .from('songs')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}; 