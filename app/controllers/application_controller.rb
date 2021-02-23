class ApplicationController < ActionController::Base
  def pagination_meta(object)
    {
        page: object.current_page,
        next_page: object.next_page,
        prev_page: object.prev_page,
        total_pages: object.total_pages,
        total_count: object.total_count
    }
  end
end
