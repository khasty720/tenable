class Post < ApplicationRecord
  belongs_to :user

  validates :image_url, presence: true
  validates :message, length: {maximum: 280}, allow_blank: true
end
