class Post < ApplicationRecord
  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :users, through: :favorites

  validates :image_url, presence: true
  validates :message, length: {maximum: 280}, allow_blank: true
end
