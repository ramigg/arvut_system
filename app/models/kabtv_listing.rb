class KabtvListing < Kabtv
  set_table_name "listing"

  def KabtvListing.copy_remote_to_local
    transaction {
      remote = KabtvListing.all
      CopyListing.delete_all
      remote.each{ |r|
        l = CopyListing.new(r.attributes)
        l.save(:validate => false)
      }
    }
  end

end
