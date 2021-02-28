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

  def pagination_data
    {
      page: params[:page],
      limit: params[:limit]
    }
  end
  helper_method :pagination_data

  def filter_data
    data = params[:q] || {}
    data[:s] ||= 'updated_at desc'
    data
  end
  helper_method :filter_data
end
