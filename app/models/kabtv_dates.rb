class KabtvDates < Kabtv
  set_table_name "dates"

  def KabtvDates.copy_remote_to_local
    transaction {
      remote = KabtvDates.all
      CopyDates.delete_all
      remote.each{ |r|
        l = CopyDates.new(r.attributes)
        l.save(:validate => false)
      }
    }
  end
end
