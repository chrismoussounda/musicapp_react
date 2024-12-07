"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Playlist } from "@/types";
import { useSongsQuery } from "@/api/hooks/useSong";
import { MultiSelect } from "../ui/multi-select";
import { useCreatePlaylistMutation } from "@/api/hooks/usePlaylist";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  coverUrl: z.string().url("Invalid URL").or(z.literal("")),
  songs: z.array(z.string()),
});

export const AddPlaylistModal = () => {
  const { mutateAsync: createPlaylist } = useCreatePlaylistMutation();
  const { data: songs = [] } = useSongsQuery();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      coverUrl: "",
      songs: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newPlaylist: Omit<Playlist, "id"> = {
      ...values,
      songs: values.songs
        ? songs.filter((song) => values.songs?.includes(song.id.toString()))
        : [],
    };
    await createPlaylist(newPlaylist);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) form.reset();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-5 w-5" />
          Create Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Playlist</DialogTitle>
          <DialogDescription>
            Create a new playlist to organize your favorite songs.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Playlist" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your playlist a catchy title.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A collection of my favorite tunes"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe your playlist.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/cover-image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a URL for the playlist cover image.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="songs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Songs</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={songs.map((song) => ({
                        label: song.title,
                        value: song.id.toString(),
                      }))}
                      placeholder="Select songs"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Select songs to add to your playlist.
                  </FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Playlist</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
