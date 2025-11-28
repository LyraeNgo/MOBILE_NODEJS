// models/Tag.js
export default class Tag {
  constructor(row) {
    this.tagId = row.tag_id;
    this.name = row.name;
    this.createdAt = row.created_at;
    this.updatedAt = row.updated_at;
  }
}
