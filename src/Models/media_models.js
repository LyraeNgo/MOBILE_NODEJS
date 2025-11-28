export class Media {
  constructor(row) {
    this.mediaId = row.media_id;
    this.eventId = row.event_id;
    this.filePath = row.file_path;
    this.type = row.type;
    this.uploadedAt = row.uploaded_at;
  }
}
