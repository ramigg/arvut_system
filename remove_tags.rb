# encoding: utf-8

tags2remove = [
]

tags2remove.each do |tag_name|
  tag = Tag.where(name: tag_name).first
  unless tag
    puts "Not found tag %#{tag_name}%"
    next
  end
  taggings = tag.taggings
  puts "Found #{taggings.count} taggings for tag #{tag.name}"
  taggings.each {|t| t.destroy}
  tag.destroy
end

Rails.cache.clear

